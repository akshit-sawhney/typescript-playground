const krakenWrapper = require('../utils/kraken_wrapper');
const fs = require('fs');

var opts = {
    file: fs.createReadStream('media/images/a.jpeg'),
    wait: true
};

async function main() {
    try {
        const response = await krakenWrapper.compressByFile(opts);   
        console.log('success: response: ', response);
    } catch (error) {
        console.log('error: ', error);
    }
}

main();
