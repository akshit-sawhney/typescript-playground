const fs = require('fs/promises');
const mongoose = require('mongoose');

let WorksheetHierarchies;

const worksheetHierarchySchema = new mongoose.Schema({
  name: { type: String },
  display: { type: String },
  description: { type: String },
  meta_description: { type: String },
  grade: { type: String },
  path: { type: String },
});

async function boot() {
  await mongoose.connect('mongodb://localhost:27017', {
    // autoReconnect: true,
    dbName: 'quizizz',
  });
  WorksheetHierarchies = mongoose.model(
    'worksheetHierarchy',
    worksheetHierarchySchema,
    'worksheetHierarchy',
  );
}

async function readJSONFile(filePath) {
  try {
    const fileData = await fs.readFile(filePath);
    return JSON.parse(fileData);
  } catch (error) {
    console.log(`Error in reading file: ${filePath}.`);
    return {};
  }
}

const allNodes = [];
const allDocs = {};

async function handleNode(node, parentNodes = [], gradeKey) {
  if (node) {
    for (const [key] of Object.entries(node)) {
      if (key === 'display') {
        let path = '/';
        parentNodes.forEach((parentNode) => {
          path += `${allDocs[parentNode.name]}/`;
        });
        const doc = await WorksheetHierarchies.create({
          name: node.name,
          display: node.display,
          descrption: null,
          grade: gradeKey,
          path: path,
        });
        allNodes.push({
          _id: doc._id,
          name: node.name,
          display: node.display,
          parentNodes: parentNodes,
        });
        allDocs[node.name] = doc._id;
      } else if (key === 'name' || key === 'description') {
        // eslint-disable-next-line no-continue
        continue;
      } else {
        const previousNodesInstance = [...parentNodes];
        let alreadyParent = false;
        previousNodesInstance.forEach((previousNodeInstance) => {
          if (previousNodeInstance.name === node.name) {
            alreadyParent = true;
          }
        });
        if (node?.name && !alreadyParent) {
          previousNodesInstance.push({
            name: node.name,
            display: node.display,
          });
        }
        await handleNode(node[key], previousNodesInstance, gradeKey);
      }
    }
  }
}

async function parseHierarchy() {
  const masterJSONData = await readJSONFile(
    'worksheets_v2/without_grade_workflow/hierarchy_without_grade.json',
  );
  for (const value of Object.values(masterJSONData)) {
    await handleNode(value, [], value.name);
  }
}

async function main() {
  await boot();
  await parseHierarchy();
  console.log(JSON.stringify(allNodes));
  console.log('done');
}

main();
