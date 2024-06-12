var fs = require('fs');
var readline = require('readline');
var { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;
const path = require('path');
const axios = require('axios');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl', 'https://www.googleapis.com/auth/youtubepartner'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
  process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart2.json';
const outputFilePath = 'output.srt'; // Output file path

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the YouTube API.
  authorize(JSON.parse(content), getCaptions);
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

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  console.log('here: ', credentials);
  console.log('1')
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
  console.log('2')

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function (err, token) {
    console.log('3')
    if (err) {
      console.log('4')
      getNewToken(oauth2Client, callback);
    } else {
      console.log('5: ', token)
      oauth2Client.credentials = JSON.parse(token);
      console.log('6: ', oauth2Client.credentials)
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function (code) {
    rl.close();
    oauth2Client.getToken(code, function (err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getCaptions(auth) {
  console.log('7: ', auth);
  var service = google.youtube('v3');
  console.log('8: ');
  console.log('8.1: ', JSON.stringify(auth));
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://www.googleapis.com/youtube/v3/captions/AUieDaYGT9K25OrwQL-w34gwTGYu-h9cseZYI2gCxCDCVi8c?tfmt=srt',
    headers: { 
      'Authorization': 'Bearer ya29.a0AXooCgs9fPf6tkqonPgB5JeALY3TQ5MqW0nxVTTUbN5S7XBWgCIUZ0s7rJjzgEY41ikBVD_BpKnNsgHyKJa3n-_SlOdGbLe8rnHIuTkUwtIj5Z7ztgZvMjrKOSrmUNoSe96fcEcRy4sxoXe-qKnTdtA_Pv3TjVeVD5V956oVcMBbaCgYKAcISARMSFQHGX2MijjuPWuCZjZaVxALlWt41vw0179'
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(response.data);
    console.log('Captions ', srtToJson(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}