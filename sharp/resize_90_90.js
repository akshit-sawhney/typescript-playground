const sharp = require("sharp");
const chalk = require("chalk");

function resize_90_90() {
  sharp("./media/images/a.jpeg")
    .resize(90)
    .toFile("./media/images/a_90_90.jpeg", (err, info) => {
      console.log(`File resize log: ${chalk.red(`Error: ${err}`)} :: ${chalk.blue(`Info: ${JSON.stringify(info)}`)}`);
    });
};

resize_90_90();
