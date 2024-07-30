const { promises: fs } = require('fs');

async function readJSONFile(filePath) {
  try {
    const fileData = await fs.readFile(filePath);
    return JSON.parse(fileData);
  } catch (error) {
    console.log(`Error in main(readJSONFile): ${filePath}.`);
    return {};
  }
}

module.exports = {
  readJSONFile,
};
