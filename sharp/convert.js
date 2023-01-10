const sharp = require("sharp");
const readFileHandler = require("../s3/readFile").readFileHandler;

async function main() {
    console.time("dbsave");
    const s3File = await readFileHandler("_media_v2/svg-file");
  sharp(s3File.Body)
    .png()
    .toFile("media/images/new-file.png")
    .then(function (info) {
      console.log(info);
    })
    .catch(function (err) {
      console.log(err);
    });
}

main();
