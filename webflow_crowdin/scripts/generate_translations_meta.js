const fs = require("fs");
const axios = require("axios");

const TRANSLATE_API = "http://localhost:8080/v1/translations/googleTranslate";

function readJSONFile(filePath) {
  try {
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
  } catch (error) {
    console.log("error in getting file: ", filePath);
    return {};
  }
}

function writeJSONFile(filePath, data) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
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
    console.log('failed: ');
    console.log(text);
    console.log(
      `Error while translating "${text}" from ${from} to ${to}: ${error}`
    );
  }
}

async function translateMissingText(locale, masterJSONData) {
  const convertedJSON = {};
  for (let i = 0; i < masterJSONData.length; i++) {
    const translatedText = await translateText(
      masterJSONData[i].meta_description,
      "en",
      locale
    );
    if (!masterJSONData[i].meta_description_translations) {
        masterJSONData[i].meta_description_translations = {};
    }
    masterJSONData[i].meta_description_translations[locale] = translatedText;
  }
  return masterJSONData;
}

async function start(locale, masterJSONData) {
  console.log(`Started translation for ${locale}`);
  const convertedJSON = await translateMissingText(locale, masterJSONData);
  writeJSONFile(
    `webflow_crowdin/worksheets_translation_jsons/without_grade/${locale}.json`,
    Object.assign(convertedJSON)
  );
  console.log(`Finished translation for ${locale}`);
}

async function main() {
  const masterJSONData = readJSONFile(
    `webflow_crowdin/worksheets_translation_jsons/without_grade/master.json`
  );
  const allLocales = ["es", "id", "pl", "pt", "th", "vi"];
  for (const locale of allLocales) {
    await start(locale, masterJSONData);
  }
  writeJSONFile(
    `webflow_crowdin/worksheets_translation_jsons/without_grade/master.json`,
    Object.assign(masterJSONData)
  );
}

main();
