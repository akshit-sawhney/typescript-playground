const fs = require('fs/promises');

async function readTextFile(filePath) {
  try {
    const fileData = await fs.readFile(filePath);
    const abc = new Buffer.from(fileData).toString();
    return abc;
  } catch (error) {
    console.log(`Error in reading file: ${filePath}.`);
    return {};
  }
}

// eslint-disable-next-line no-unused-vars
let allData = [];

async function parseHierarchyReadFile() {
  const masterData = await readTextFile('aa.txt');
  const parsedData = masterData.split(/\n/);
  allData = parsedData;
}

async function findDescription(keywordString) {
  const searchableString = `keywords:  ${keywordString}`;
  const searchIndex = allData.indexOf(searchableString);
  if (searchIndex !== -1 && allData[searchIndex + 1] !== 'output:  {}') {
    let ret = allData[searchIndex + 1].replace('output: ', '');
    const returnString = ret;
    return returnString;
  }
}

module.exports = {
  findDescription,
  parseHierarchyReadFile,
};

