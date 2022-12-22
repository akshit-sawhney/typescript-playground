const fs = require('fs');
const AWS = require('aws-sdk');
const constants = require('../constants/index');
const logger = require('../helpers/logger');

const s3 = new AWS.S3({
    accessKeyId: constants.AWS_KEY,
    secretAccessKey: constants.AWS_SECRET,
    region: constants.AWS_REGION,
});

const uploadFile = (fileName) => {
    const fileContent = fs.readFileSync(fileName);

    const params = {
        Bucket: 'quizizz-static-dev',
        Key: '_media_v2/cat.jpeg',
        Body: fileContent
    };

    s3.upload(params, function(err, data) {
        if (err) {
            logger.errorj('File upload error response: ', err);
        } else {
            logger.infoj('File upload success response: ', data);
        }
    });
};

module.exports = {
    uploadFile,
}