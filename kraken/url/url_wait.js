const constants = require('../../constants');

const compressByUrl = require('../utils/kraken_wrapper').compressByUrl;

var opts = {
    url: 'https://quizizz-static-dev.s3.amazonaws.com/_media_v2/01a58ac0-cd65-4dfe-b266-284faea896f7.jpeg',
    wait: true,
    s3_store: {
        key: constants.AWS_KEY,
        secret: constants.AWS_SECRET,
        bucket: 'quizizz-static-dev',
        region: constants.AWS_REGION,
        path: '_media_v2/01a58ac0-cd65-4dfe-b266-284faea896f7.jpeg',
        metadata: {
            'x-amz-meta-image-processed': '1'
        },
        headers: {
            'Cache-Control': "public, max-age=31536000"
        }
    }
};

async function main() {
    try {
        const response = await compressByUrl(opts);   
        console.log('response from wrapper is: ', response);
    } catch (error) {
        console.log('error: ', error);
    }
}

main();


