const fs = require("pn/fs");
const svg2png = require("svg2png");

fs.readFile("media/images/5c387e36-4070-401c-ab5a-b6f77cc996a7-v2").then(
  (buffer) => {
    svg2png(buffer, { width: 600 })
      .then((buffer) => fs.writeFile("media/images/dest.png", buffer))
      .catch((e) => {
        console.error(e);
      });
  }
);
