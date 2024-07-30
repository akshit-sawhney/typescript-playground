const { readJSONFile } = require('./helpers/readFile');
const _ = require('lodash');
const { writeJSONFile } = require('./helpers/writeFile');

const countTill = 28;
const FILE_PATH_PREFIX = 'casa/mergePublicELBLogs/files/Power Query Results July 30';
const FILE_PATH_SUFFIC = '.json';
const INITIAL_FILE_PATH = 'casa/mergePublicELBLogs/files/Power Query Results July 30.json';
const FINAL_OUTPUT_PATH = 'casa/mergePublicELBLogs/files/mergedLogs.json';
const finalOutput = {};
let finalOutputArray = [];

async function main() {
    const allData = await readJSONFile(INITIAL_FILE_PATH);
    _.forEach(allData, function(value, key) {
        if (finalOutput[value.parsedPath]) {
            finalOutput[value.parsedPath].count += value.total;
        } else {
            finalOutput[value.parsedPath] = {
                count: value.total,
                componentType: value.componentType,
                method: value.method,
            };
        }
      });
      for (let i=1; i<=countTill; i++) {
        const filePath = `${FILE_PATH_PREFIX} (${i})${FILE_PATH_SUFFIC}`;
        const data = await readJSONFile(filePath);
        _.forEach(data, function(value, key) {
            if (finalOutput[value.parsedPath]) {
                finalOutput[value.parsedPath].count += value.total;
            } else {
                finalOutput[value.parsedPath] = {
                    count: value.total,
                    componentType: value.componentType,
                    method: value.method,
                };
            }
        });
    }

    _.forEach(finalOutput, function(value, key) {
        finalOutputArray.push({
            parsedPath: key,
            total: value.count,
        });
    });
    finalOutputArray = _.orderBy(finalOutputArray, ['total'], ['desc']);

    await writeJSONFile(FINAL_OUTPUT_PATH, finalOutputArray);
}

main()
    .then(res => {
        console.log('done');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    })