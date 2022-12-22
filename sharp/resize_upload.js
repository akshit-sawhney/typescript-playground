const sharp = require("sharp");
const logger = require("../helpers/logger");
const uploadHandler = require("../s3/upload");
const readFileHandler = require("../s3/readFile").readFileHandler;

async function resizeS3(key) {
  const s3File = await readFileHandler(key);
  console.log(s3File);
  sharp(s3File)
    .resize(90)
    .toBuffer(function (err, data) {
      if (err) {
        logger.errorj("Error in Sharp: ", err);
      } else {
        uploadHandler.uploadFile(data, `${key}_90_90`);
      }
    });
}

async function main() {
  await resizeS3("_media_v2/01a58ac0-cd65-4dfe-b266-284faea896f7.jpeg");
}

main();
