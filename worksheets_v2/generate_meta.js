const fs = require('fs/promises');
const fs1 = require("fs");
const { generateResponse } = require('./generate_meta_text');

async function readJSONFile(filePath) {
  try {
    const fileData = await fs.readFile(filePath);
    return JSON.parse(fileData);
  } catch (error) {
    console.log(`Error in reading file: ${filePath}.`);
    return {};
  }
}

function writeJSONFile(filePath, data) {
  try {
    const jsonData = JSON.stringify(data);
    fs1.writeFileSync(filePath, jsonData);
  } catch (error) {
    console.log(`Error while writing ${filePath}: ${error}`);
  }
}

const allPrompts = [];

async function handleNode(node, parentNode, previousDisplays = [], gradeDisplay) {
  for (const [key, value] of Object.entries(node)) {
    if (key === 'display') {
      let promptResponse;
      if (value === gradeDisplay) {
        const keywords = `${value} worksheets`;
        promptResponse = await generateResponse(keywords);
        allPrompts.push(keywords);
        console.log('keywords: ', keywords);
        console.log('output: ', promptResponse);
        node.meta_description = promptResponse;
      } else {
        let parentNodeDisplays;
        if (previousDisplays && previousDisplays.length) {
          parentNodeDisplays = previousDisplays[0]
        }
        const keyword = `${value} worksheets for ${gradeDisplay}, ${parentNodeDisplays ? parentNodeDisplays : ''}`;
        promptResponse = await generateResponse(keyword);
        allPrompts.push(keyword);
        console.log('keywords: ', keyword);
        console.log('output: ', promptResponse);
        node.meta_description = promptResponse;
      }
    } else if (key === 'name') {
      // eslint-disable-next-line no-continue
      continue;
    } else {
      const previousDisplaysInstance = [...previousDisplays];
      if (parentNode?.display && parentNode?.display !== gradeDisplay) {
        previousDisplaysInstance.push(parentNode.display);
      }
      await handleNode(value, node, previousDisplaysInstance, gradeDisplay);
    }
  }
}

async function parseHierarchy() {
  const masterJSONData = await readJSONFile('worksheets_v2/source_hierarchy.json');
  for (const value of Object.values(masterJSONData)) {
    await handleNode(value, null, [], value.display);
  }
  writeJSONFile('worksheets_v2/my_updated.json', masterJSONData);
}

async function main() {
  await parseHierarchy();
}

main();
