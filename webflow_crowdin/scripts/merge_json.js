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

function mergeData(oldData, newData) {
    const mergedJSON = Object.assign({}, oldData, newData);
    return mergedJSON;
}

async function start(locale) {
  console.log(`Started translation for ${locale}`);
  const oldData = readJSONFile(`webflow_crowdin/core_project_jsons/old_data.json`);
  const newData = readJSONFile(`webflow_crowdin/core_project_jsons/new_data.json`);
  const mergedData = mergeData(oldData, newData);
  writeJSONFile(`webflow_crowdin/core_project_jsons/new_master_merged.json`, mergedData);
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
