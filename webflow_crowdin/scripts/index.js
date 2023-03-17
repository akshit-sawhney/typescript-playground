const fs = require("fs");
const axios = require("axios");

const TRANSLATE_API = "http://localhost:8080/v1/translations/googleTranslate";

const convertedJSON = {};
function getMasterJSONData() {
  let masterJSONFile = fs.readFileSync(
    "webflow_crowdin/core_project_jsons/master.json"
  );
  let masterJSONData = JSON.parse(masterJSONFile);
  return masterJSONData;
}

function getExistingProjectJSONData(locale) {
  let existingJSONFile = fs.readFileSync(
    `webflow_crowdin/existing_project_jsons/${locale}.json`
  );
  let existingJSONData = JSON.parse(existingJSONFile);
  return existingJSONData;
}

function saveGeneratedJSON(locale, convertedJSON) {
  try {
    let data = JSON.stringify(convertedJSON);
    fs.writeFileSync(`webflow_crowdin/core_project_jsons/${locale}.json`, data);
  } catch (error) {
    console.log("error is: ", error);
  }
}

async function main(locale) {
  const masterJSONData = getMasterJSONData();
  const existingJSONData = getExistingProjectJSONData(locale);

  for (let key in masterJSONData) {
    if (masterJSONData.hasOwnProperty(key)) {
      if (existingJSONData[key]) {
        convertedJSON[key] = existingJSONData[key];
      } else {
        try {
          const requestBody = {
            content: masterJSONData[key],
            to: locale,
            from: "en",
            format: "text",
          };
          try {
            const apiResponse = await axios.post(TRANSLATE_API, requestBody);
            const translationResponse = apiResponse.data.data;
            convertedJSON[key] = translationResponse.translatedText;
          } catch (error) {
            console.log("failure in any case: ", requestBody, key);
          }
        } catch (error) {
          console.log("error: ", error);
        }
      }
    }
  }

  for (let key in existingJSONData) {
    if (existingJSONData.hasOwnProperty(key)) {
      if (!masterJSONData[key]) {
        convertedJSON[key] = existingJSONData[key];
      }
    }
  }

  saveGeneratedJSON(locale, convertedJSON);
}

main(process.argv[2]);
