const AWS = require("aws-sdk");
const constants = require("../constants/index");
const logger = require("../helpers/logger");

const s3 = new AWS.S3({
  accessKeyId: constants.AWS_KEY,
  secretAccessKey: constants.AWS_SECRET,
  region: constants.AWS_REGION,
});

async function readFileHandler(key) {
  const paramsGET = {
    Bucket: "quizizz-static-dev",
    Key: key,
  };

  try {
    s3Response = await s3.getObject(paramsGET).promise();
    // console.log('here: ', s3Response);
    return s3Response;
  } catch (e) {
    logger.errorj("Reading file error: ", e);
    return;
  }
}

module.exports = {
  readFileHandler,
};
