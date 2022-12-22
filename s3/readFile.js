const AWS = require("aws-sdk");
const constants = require("../constants/index");
const logger = require("../helpers/logger");

const s3 = new AWS.S3({
  accessKeyId: constants.AWS_KEY,
  secretAccessKey: constants.AWS_SECRET,
  region: constants.AWS_REGION,
});

async function readFileHandler() {
  const paramsGET = {
    Bucket: "quizizz-static-dev",
    Key: "_media_v2/01a58ac0-cd65-4dfe-b266-284faea896f7.jpeg",
  };

  try {
    s3Response = await s3.getObject(paramsGET).promise();
    return s3Response.Body;
  } catch (e) {
    logger.errorj('Reading file error: ', e);
    return;
  }
}

module.exports = {
    readFileHandler
}
