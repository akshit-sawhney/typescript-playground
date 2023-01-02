const sharp = require("sharp");
const logger = require("../helpers/logger");

function resize_90_90() {
  sharp("./media/images/svg-file.png")
    .resize(90)
    .toFormat('png')
    .toFile("./media/images/resized-svg-file-png", (err, info) => {
      if (err) {
        logger.error(`Error in file resize: ${err}`);
      } else {
        logger.infoj(`Success in file resize: `, info);
      }
    });
}

async function main() {
  resize_90_90();
}

main();
