const sharp = require("sharp");
const logger = require("../helpers/logger");
const uploadHandler = require("../s3/upload");
const readFileHandler = require("../s3/readFile").readFileHandler;

async function resizeS3(key) {
  const s3File = await readFileHandler(key);
  console.log(s3File);
  const contentType = s3File.ContentType;
  sharp(s3File.Body)
    .resize(90)
    .toFormat('jpeg')
    .toBuffer(function (err, data) {
      if (err) {
        console.log('error: ', err);
        logger.errorj("Error in Sharp: ", err);
      } else {
        uploadHandler.uploadFile(data, `${key}_90_90`, contentType);
      }
    });
}

async function main() {
  await resizeS3("_media_v2/image-file");
}

main();
