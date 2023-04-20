const mongoose = require("mongoose");

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
  await mongoose.connect("mongodb://localhost:27017", {
    // autoReconnect: true,
    dbName: "quizizz",
  });
  WorksheetHierarchies = mongoose.model(
    "worksheetHierarchy",
    worksheetHierarchySchema,
    "worksheetHierarchy"
  );
}

async function getAllGrades() {
  const docs = await WorksheetHierarchies.find({ path: "/" });
  console.log("response: ", docs.length);
}

async function searchByKeyword(keyword, gradeName) {
  const searchPrompt = {
    name: keyword,
  };
  if (gradeName) {
    searchPrompt.grade = gradeName;
  } else {
    searchPrompt.grade = "no-grade";
  }
  const docs = await WorksheetHierarchies.find(searchPrompt);
  console.log("searchByKeyword response: ", docs);
}

async function getImmediateChildren(parentNodeId) {
  const searchPrompt = {
    path: new RegExp(`\/\\w+\/${parentNodeId}\/`),
  };
  console.log("search promt: ", searchPrompt);
  const docs = await WorksheetHierarchies.find(searchPrompt);
  console.log("getImmediateChildren response: ", docs);
}

async function getSiblings(currentNodeName, gradeName) {
  const searchPrompt = {
    name: currentNodeName,
  };
  if (gradeName) {
    searchPrompt.grade = gradeName;
  } else {
    searchPrompt.grade = "no-grade";
  }
  const doc = await WorksheetHierarchies.findOne(searchPrompt);
  const siblingSearchPrompt = {
    path: doc.path,
  };
  if (gradeName) {
    searchPrompt.grade = gradeName;
  } else {
    searchPrompt.grade = "no-grade";
  }
  const siblingDocs = await WorksheetHierarchies.find(siblingSearchPrompt);
  console.log("getSiblings response: ", siblingDocs);
  return siblingDocs;
}

async function getCompleteHierarchy() {
  const docs = await WorksheetHierarchies.find();
  console.log("getCompleteHierarchy response: ", docs);
  return docs;
}

async function main() {
  await boot();
  //   await getAllGrades();
  //   await searchByKeyword('the-arts', 'kg');
  // await getImmediateChildren("643f81d6ebeef01c2b8d4f4a");
  // await getSiblings("colors", "kg");
  await getCompleteHierarchy();
  process.exit(0);
}

main();
