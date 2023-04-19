const fs = require("fs");
const axios = require("axios");

const TRANSLATE_API = "http://localhost:8080/v1/translations/googleTranslate";

function readJSONFile(filePath) {
    try {
        const fileData = fs.readFileSync(filePath);
        return JSON.parse(fileData);   
    } catch (error) {
        console.log('error in getting file: ', filePath);
        return {};
    }
}

function writeJSONFile(filePath, data) {
  try {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(filePath, jsonData);
  } catch (error) {
    console.log(`Error while writing ${filePath}: ${error}`);
  }
}

async function translateText(text, from, to) {
  const requestBody = {
    content: text,
    to: to,
    from: from,
    format: "text",
  };
  try {
    const apiResponse = await axios.post(TRANSLATE_API, requestBody);
    const translationResponse = apiResponse.data.data;
    return translationResponse.translatedText;
  } catch (error) {
    console.log(`Error while translating "${text}" from ${from} to ${to}: ${error}`);
  }
}

async function translateMissingText(locale, masterJSONData) {
  const convertedJSON = {};
  for (let key in masterJSONData) {
    if (masterJSONData.hasOwnProperty(key)) {
        const translatedText = await translateText(masterJSONData[key], "en", locale);
        convertedJSON[key] = translatedText;
    }
  }
  return convertedJSON;
}

async function start(locale) {
  console.log(`Started translation for ${locale}`);
  const masterJSONData = readJSONFile(`webflow_crowdin/core_project_jsons/master.json`);
  const convertedJSON = await translateMissingText(locale, masterJSONData);
  writeJSONFile(`webflow_crowdin/core_project_jsons/${locale}.json`, Object.assign(convertedJSON));
  console.log(`Finished translation for ${locale}`);
}

async function main() {
  const allLocales = [
    'id'
  ];
  for (const locale of allLocales) {
    await start(locale);
  }
}

main();
