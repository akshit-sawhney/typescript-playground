const { readJSONFile } = require('../../helpers/readFile');
const { writeJSONFile } = require('../../helpers/writeFile');
const _ = require('lodash');

const FILE_PATH = 'translations-v2/backfills/files/id.json';
const NON_TRANSLATED_DATA = 'translations-v2/backfills/files/noTranslated.json';

async function main() {
    const allTranslations = await readJSONFile(FILE_PATH);
    const finalOutput = {};

    _.forOwn(allTranslations, function(value, key) {
        if (key === value) {
            finalOutput[key] = value;
        }
     } );
     await writeJSONFile(NON_TRANSLATED_DATA, finalOutput);
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