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

async function getAllGrades() {
    const docs = await WorksheetHierarchies.find({path: '/'});
    console.log('response: ', docs.length);
}

async function searchByKeyword(keyword, gradeName) {
    const searchPrompt = {
        name: keyword
    }
    if (gradeName) {
        searchPrompt.grade = gradeName;
    } else {
        searchPrompt.grade = 'no-grade';
    }
    const docs = await WorksheetHierarchies.find(searchPrompt);
    console.log('searchByKeyword response: ', docs);
}

async function getImmediateChildren(parentNodeId) {
    const searchPrompt = {
        path: new RegExp(`\/\\w+\/${parentNodeId}\/`)
    }
    console.log('search promt: ', searchPrompt)
    const docs = await WorksheetHierarchies.find(searchPrompt);
    console.log('getImmediateChildren response: ', docs);
}

async function main() {
  await boot();
//   await getAllGrades();
//   await searchByKeyword('the-arts', 'kg');
  await getImmediateChildren('643f81d6ebeef01c2b8d4f4a');
}

main();
