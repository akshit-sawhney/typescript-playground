const sharp = require("sharp");
const logger = require("../helpers/logger");

function resize_90_90() {
  sharp("./media/images/searching-min.gif")
    .resize(200)
    .toFormat('gif')
    .toFile("./media/images/searching-min_compressed.gif", (err, info) => {
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
