const fs = require('fs/promises');
const fs1 = require("fs");
const { parseHierarchyReadFile, findDescription } = require('./read_file');

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
      const jsonData = JSON.stringify(data, null, 4);
      fs1.writeFileSync(filePath, jsonData);
    } catch (error) {
      console.log(`Error while writing ${filePath}: ${error}`);
    }
  }

async function handleNode(node, parentNode, previousDisplays = [], gradeDisplay) {
  for (const [key, value] of Object.entries(node)) {
    if (key === 'display') {
      if (!node.meta_description) {
        if (value === gradeDisplay) {
          const keywords = `${value} worksheets`;
          const descriptionResponse = await findDescription(keywords);
          node.meta_description = descriptionResponse;
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
          const descriptionResponse = await findDescription(keyword);
          node.meta_description = descriptionResponse;
        }
      } else {
        // eslint-disable-next-line no-continue
        continue;
      }
    } else if (key === 'name' || key === 'description' || key === 'meta_description') {
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
  console.log('done: ', masterJSONData);
  writeJSONFile('worksheets_v2/without_grade_workflow/hierarchy_without_grade.json', masterJSONData);
}

async function main() {
  await parseHierarchyReadFile();
  await parseHierarchy();
  
}

main();
