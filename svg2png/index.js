const fs = require("pn/fs");
const svg2png = require("svg2png");
const readFileHandler = require("../s3/readFile").readFileHandler;

async function main() {
  console.time("svg2pngUsingRemote");
  const s3File = await readFileHandler("_media_v2/svg-file");
  svg2png(s3File.Body, { width: 600 })
    .then(buffer => {
      fs.writeFile("media/images/dest.png", buffer)
      console.timeEnd("svg2pngUsingRemote");
    })
    .catch((e) => {
      console.error(e);
    });
}

main();
