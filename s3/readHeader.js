const AWS = require("aws-sdk");
const constants = require("../constants/index");
const logger = require("../helpers/logger");

const s3 = new AWS.S3({
  accessKeyId: constants.AWS_KEY,
  secretAccessKey: constants.AWS_SECRET,
  region: constants.AWS_REGION,
});

async function readHeaderHandler(key) {
  const paramsGET = {
    Bucket: "quizizz-static-dev",
    Key: key,
  };

  try {
    s3Response = await s3.headObject(paramsGET).promise();
    console.log('here: ', s3Response);
    return s3Response;
  } catch (e) {
    logger.errorj("Reading file error: ", e);
    return;
  }
}

// Success Call
// readHeaderHandler('_media_v2/image-file_900_900');
// Failure call
readHeaderHandler('_media_v2/image-file_901_900');

module.exports = {
    readHeaderHandler,
};
