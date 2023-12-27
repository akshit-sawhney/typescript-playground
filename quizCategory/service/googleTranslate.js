const axios = require("axios")

const headers = {
  'Content-Type': 'application/json',
};

const API_URL = 'https://dev-services-2.quizizz.com/_trnserver/main/v1';

async function getTranslation(content, to, from, format) {
  if (to === from) {
    return {
      data: {
        translatedText: content,
      }
    }
  }
  const payload = {
    content, to, from, format,
  }
  try {
    const response = await axios.post(`${API_URL}/translations/googleTranslate`, payload, { headers });
    return response.data;
  } catch (error) {
    console.log('error received: ', error.message);
  }
}

module.exports = {
  getTranslation,
}