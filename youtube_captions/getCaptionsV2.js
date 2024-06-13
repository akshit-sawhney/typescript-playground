var { google } = require('googleapis');
const axios = require('axios');
var OAuth2 = google.auth.OAuth2;

const CODE = '4/0ATx3LY4ZzpOU5xQO4QdnJyOIrsfXlmfGnMUSZl3xPaNK10flEPUbCOogSpfFI3K2I2Qp6Q';
const CREDS = {
  "installed": {
    "client_id": "122502555930-q45jv2p4gnjqepnn3r24o938877346vl.apps.googleusercontent.com",
    "project_id": "ixchel-social",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "9SWs9Al1Nyx5Ax8CpsC3KsiL",
    "redirect_uris": [
      "https://dev/quizizz.com/oauth2callback"
    ],
    "javascript_origins": [
      "http://localhost:8100"
    ]
  }
};
let TOKEN = 'ya29.a0AXooCgtuiVW8tfmxYmNzGQn8Cp_mIXwizb_N8aVQSJUg5EiG1uYNGLiF2ZJJ2SA28S_KImQrcOZgw3vp8MZbAQAeVFutRKkbq6D0z7Nz-aFXDwTzeA5awwdBZicUEMHm-EDUCYFLaQ5zSDcqXQX0Gya8qAiMPDE1cV7JBKo_AO0CaCgYKAVcSARMSFQHGX2MiOot2SUySNp0evdJuX_hV5g0179';
const YOUTUBE_API_KEY = 'AIzaSyAGPBDMZg1vrCak8OyfzChWEZKC9s0oc4I';
const VIDEO_ID = 'OV72qTOU7_U';

const youtube = google.youtube({
  version: 'v3',
  auth: YOUTUBE_API_KEY,
});

function srtToJson(srtContent) {
  const subtitleEntries = [];
  const subtitleBlocks = srtContent.trim().split('\n\n');

  subtitleBlocks.forEach(block => {
    const lines = block.split('\n');
    const sequenceNumber = parseInt(lines[0]);
    const timeMatch = lines[1].match(/(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/);
    const startTime = timeMatch[1];
    const endTime = timeMatch[2];
    const text = lines.slice(2).join('\n');

    subtitleEntries.push({
      startTime: startTime,
      endTime: endTime,
      text: text
    });
  });

  return JSON.stringify(subtitleEntries, null, 2);
}

async function listCaptions(videoId) {
  try {
    const captionsResponse = await youtube.captions.list({
      part: ['snippet', 'id'],
      videoId: videoId,
    });

    const captions = captionsResponse.data.items.map(item => {
      return {
        id: item.id,
        language: item.snippet.language,
        name: item.snippet.name,
      };
    });

    return captions;
  } catch (error) {
    console.error('Error retrieving captions:', error.message);
    return null;
  }
}

async function authorize(code) {
  var clientSecret = CREDS.installed.client_secret;
  var clientId = CREDS.installed.client_id;
  var redirectUrl = CREDS.installed.redirect_uris[0];
  var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
  try {
    const tokenResponse = await oauth2Client.getToken(code);
    if (tokenResponse && tokenResponse.tokens && tokenResponse.tokens.access_token) {
      TOKEN = tokenResponse.tokens.access_token;
    }
  } catch (error) {
    console.log('errrr: ', error);
  }
  return TOKEN;
}

async function getCaptions(captionId, token) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://www.googleapis.com/youtube/v3/captions/${captionId}?tfmt=srt`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const response = await axios.request(config);
  const captions = srtToJson(response.data);
  return captions;
}

async function main() {
  const captionsResponse = [];
  const captionsList = await listCaptions(VIDEO_ID);
  if (!TOKEN) {
    await authorize(CODE);
  }
  for (const caption of captionsList) {
    captionsResponse.push(await getCaptions(caption.id, TOKEN));
  }
  return captionsResponse;
}

main().then(res => {
  console.log('finally: ', res);
})
  .catch(err => {
    console.error(err);
  });
