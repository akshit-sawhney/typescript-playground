const fs = require('fs/promises');
const fs1 = require("fs");

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

const allNodes = [];

async function handleNode(node, parentNode, previousDisplays = [], gradeDisplay) {
  for (const [key, value] of Object.entries(node)) {
    if (key === 'display') {
      let promptResponse;
      if (value === gradeDisplay) {
        allNodes.push({
            name: node.name,
            display: node.display,
            grade: gradeDisplay,
        });
      } else {
        allNodes.push({
            name: node.name,
            display: node.display,
            grade: gradeDisplay,
            subject: previousDisplays? previousDisplays[0]: null,
            topic: previousDisplays? previousDisplays[1]: null,
            sub_topic: previousDisplays? previousDisplays[2]: null
        })
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
  console.log('done');
  console.log(allNodes);
  writeJSONFile('worksheets_v2/shamil/output.json', allNodes);
}

async function main() {
  await parseHierarchy();
}

main();
