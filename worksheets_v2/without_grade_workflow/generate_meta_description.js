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

async function writeJSONFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 4));
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
        if (value) {
          const keywords = `${value} worksheets`;
          promptResponse = await generateResponse(keywords);
          allPrompts.push(keywords);
          console.log('keywords: ', keywords);
          // console.log('output: ', promptResponse);
          node.meta_description = promptResponse;
        }
      } else {
        let parentNodeDisplays;
        if (previousDisplays && previousDisplays.length) {
          parentNodeDisplays = previousDisplays[0]
        }
        let keyword;
        if (gradeDisplay) {
          keyword = `${value} worksheets for ${gradeDisplay}, ${parentNodeDisplays ? parentNodeDisplays : ''}`;
        } else {
          keyword = `${value} worksheets , ${parentNodeDisplays ? parentNodeDisplays : ''}`;
        }
        promptResponse = await generateResponse(keyword);
        allPrompts.push(keyword);
        console.log('keywords: ', keyword);
        // console.log('output: ', promptResponse);
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
  const masterJSONData = await readJSONFile('worksheets_v2/without_grade_workflow/hierarchy_without_grade.json');
  for (const value of Object.values(masterJSONData)) {
    await handleNode(value, null, [], value.display);
  }
  writeJSONFile('worksheets_v2/without_grade_workflow/my_updated.json', masterJSONData);
}

async function main() {
  await parseHierarchy();
}

main();
