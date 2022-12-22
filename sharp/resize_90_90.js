const sharp = require("sharp");
const logger = require("../helpers/logger");
const uploadHandler = require('../s3/upload');
const readFileHandler = require('../s3/readFile').readFileHandler;

function resize_90_90() {
  sharp("./media/images/a.jpeg")
    .resize(90)
    .toFile("./media/images/a_90_90.jpeg", (err, info) => {
      if (err) {
        logger.error(`Error in file resize: ${err}`);
      } else {
        logger.infoj(`Success in file resize: `, info);
      }
    });
}

async function resizeS3() {
  const s3File = await readFileHandler();
  console.log(s3File);
  sharp(s3File)
    .resize(90)
    .toBuffer(function (err, data) {
      if(err) {
        logger.errorj('Error in Sharp: ', err);
      } else {
        uploadHandler.uploadFile(data);
      }
    });
}

// resize_90_90();

async function main() {
  await resizeS3();
}

main();
