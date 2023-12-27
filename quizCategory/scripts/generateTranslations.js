const { readJSONFile } = require('../utils/readFile');
const { writeJSONFile } = require('../utils/writeFile');
const { getTranslation } = require('../service/googleTranslate');

const FILE_PATH = 'quizCategory/files/inputData.json';
const OUTPUT_FILE_PATH = 'quizCategory/files/outputData.json';
const LANGUAGES = ['en', 'es', 'id', 'pl', 'pt', 'th', 'vi'];

function getTextFromNode(node) {
  return node['FIELD4'] || node['FIELD3'] || node['FIELD2'] || node['FIELD1']
}

async function main() {
  const allNodes = await readJSONFile(FILE_PATH);
  console.log('all nodes retrieved: ', allNodes.length);
  for (const node of allNodes) {
    node['LEAF_NODE'] = getTextFromNode(node);
    for (const language of LANGUAGES) {
      console.log('text: ', getTextFromNode(node));
      const translatedTextResponse = await getTranslation(getTextFromNode(node), language, 'en', 'text');
      console.log('here: ', translatedTextResponse.data.translatedText);
      if (!node.translations) {
        node.translations = {};
      }
      node.translations[language] = translatedTextResponse.data.translatedText;
    }
  }
  await writeJSONFile(OUTPUT_FILE_PATH, allNodes);
}

main()
  .then(res => {
    console.log('done');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
