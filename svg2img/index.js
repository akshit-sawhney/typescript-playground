const fs = require("fs");
const svg2img = require("svg2img");
const readFileHandler = require("../s3/readFile").readFileHandler;

async function main() {
  console.time("dbsaveUsingBuffer");
  const s3File = await readFileHandler("_media_v2/svg-file");
  svg2img(s3File.Body.toString(), function (error, buffer) {
    fs.writeFileSync("media/images/svg-file.png", buffer);
    console.timeEnd("dbsaveUsingBuffer");
  });
}

async function main1() {
    console.time("dbsaveUsingRemote");
    svg2img('https://quizizz-static-dev.s3.amazonaws.com/_media_v2/svg-file', function (error, buffer) {
      fs.writeFileSync("media/images/svg-file.png", buffer);
      console.timeEnd("dbsaveUsingRemote");
    });
  }

main1();
main();
