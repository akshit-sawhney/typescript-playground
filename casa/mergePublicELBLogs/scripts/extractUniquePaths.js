const _ = require('lodash');
const { readJSONFile } = require('./helpers/readFile');
const { writeJSONFile } = require('./helpers/writeFile');
const WRITE_PATH = 'casa/mergePublicELBLogs/files/trimmedQuizizzRoutesUnique.json'

async function main() {

    const data = await readJSONFile('casa/mergePublicELBLogs/files/trimmedQuizizzRoutes.json');

// Group by path
const groupedByPath = _.groupBy(data, 'path');

// Merge methods for each path
const mergedData = _.map(groupedByPath, (entries, path) => {
  const mergedMethods = _.merge({}, ...entries.map(entry => entry.methods));
  return {
    path,
    methods: mergedMethods
  };
});

console.log(mergedData);
await writeJSONFile(WRITE_PATH, Array.from(mergedData));
}

main().then(res => {
    console.log('done: ');
    process.exit(0);
}).catch(err => {
    console.log('not done');
    process.exit(1);
});