const constants = require('../../constants');

const compressByUrl = require('../utils/kraken_wrapper').compressByUrl;

var opts = {
    url: 'https://quizizz-static-dev.s3.amazonaws.com/_media_v2/sample_640%25C3%2597426.jpeg',
    wait: true,
    resize: [
        {
            id: '_media_v2/sample_640%25C3%2597426.jpeg_200',
            storage_path: '_media_v2/sample_640%C3%97426.jpeg_200',
            width: 200,
            strategy: 'landscape'
        },
    ],
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


