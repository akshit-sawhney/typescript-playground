const { Translate } = require("@google-cloud/translate").v2;
const dotenv = require("dotenv");
dotenv.config();
const logger = require('../helpers/logger');

function privateKey(val) {
  if (!val) {
    return null;
  }
  const content = val.split(":").join("\n");
  return `-----BEGIN PRIVATE KEY-----\n${content}\n-----END PRIVATE KEY-----\n`;
}

const googleCreds = {
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CREDENTIALS_CLIENT_EMAIL,
    private_key: privateKey(process.env.GOOGLE_CREDENTIALS_PRIVATE_KEY),
  },
};

const translate = new Translate(googleCreds);

const text = "I spea russian";

/**
 * 
 * @param {string} text The text that needs to be translated
 * @param {string} from The source language
 * @param {string} to The destination language
 * @returns {string} Translated text
 */
async function translateHandler(text, from, to) {
  const translationOptions = { from, to };
  let [translation] = await translate.translate(text, translationOptions);
  return translation;
}

async function main() {
  const response = await translateHandler(text, 'en', 'ru');
  logger.infoj('response:', response);
}

main();
