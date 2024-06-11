const { promises: fs } = require('fs');

async function writeJSONFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(`Error while writing ${filePath}: ${error}`);
  }
}

module.exports = {
  writeJSONFile,
};
