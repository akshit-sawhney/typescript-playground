// Import the json2csv module
const { Parser } = require('json2csv');
const fs = require('fs');
const { readJSONFile } = require('./helpers/readFile');
const OUTPUT_CSV_PATH = 'casa/mergePublicELBLogs/files/trimmedGameServiceRoutes.csv';

async function main() {
    // Sample JSON data
const jsonData = await readJSONFile('casa/mergePublicELBLogs/files/trimmedGameServiceRoutes.json');

// Create a new Parser object
const json2csvParser = new Parser();
const csv = json2csvParser.parse(jsonData);

// Output the CSV data to a file
fs.writeFile(OUTPUT_CSV_PATH, csv, function (err) {
  if (err) throw err;
  console.log('CSV file saved.');
});
}

main().then(res => {
    console.log('done')
}).catch(err => {
    console.log('not done: ', err);
});
