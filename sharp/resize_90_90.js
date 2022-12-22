const sharp = require("sharp");
const logger = require("../helpers/logger");

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

resize_90_90();
