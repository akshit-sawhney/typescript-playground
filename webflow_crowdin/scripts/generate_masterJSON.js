const fs = require("fs");

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

async function translateMissingText(masterJSONData) {
  const convertedJSON = {};
  for (let key in masterJSONData) {
    if (masterJSONData.hasOwnProperty(key)) {
        convertedJSON[key] = key;
    }
  }
  return convertedJSON;
}

function getMissingKeys(masterJSONData, existingJSONData) {
  const missingKeys = {};
  for (let key in existingJSONData) {
    if (existingJSONData.hasOwnProperty(key)) {
      if (!masterJSONData[key]) {
        missingKeys[key] = key;
      }
    }
  }
  return missingKeys;
}

async function start(locale) {
  console.log(`Started translation for ${locale}`);
  const masterJSONData = readJSONFile(`webflow_crowdin/core_project_jsons/master.json`);
  const existingJSONData = readJSONFile(`webflow_crowdin/existing_project_jsons/${locale}.json`);
  const convertedJSON = await translateMissingText(masterJSONData);
  const missingKeys = getMissingKeys(masterJSONData, existingJSONData);
  writeJSONFile(`webflow_crowdin/core_project_jsons/new_master.json`, Object.assign(convertedJSON, missingKeys));
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
