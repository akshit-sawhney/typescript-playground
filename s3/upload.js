const AWS = require("aws-sdk");
const constants = require("../constants/index");
const logger = require("../helpers/logger");

const s3 = new AWS.S3({
  accessKeyId: constants.AWS_KEY,
  secretAccessKey: constants.AWS_SECRET,
  region: constants.AWS_REGION,
});

const uploadFile = (fileContent, key, contentType) => {
  console.log('contentType: ', contentType);
  const params = {
    Bucket: "quizizz-static-dev",
    Key: key,
    Body: fileContent,
    ACL: "public-read",
    ContentType: contentType,
    Metadata: {
      'x-amz-meta-image-processed': '1',
      'Content-Type': contentType,
    },
    CacheControl: 'public, max-age=31536000',
  };

  s3.upload(params, function (err, data) {
    if (err) {
      logger.errorj("File upload error response: ", err);
    } else {
      logger.infoj("File upload success response: ", data);
    }
  });
};

module.exports = {
  uploadFile,
};
