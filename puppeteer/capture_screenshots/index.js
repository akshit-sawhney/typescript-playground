const puppeteer = require("puppeteer");

const URL = "https://quizizz.com/en/properties-of-carbon-worksheets";
const ID = "asdf";

const Screenshot = async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(URL);

  await page.waitForSelector("#app-body-container");
  const logo = await page.$("#app-body-container");

  await logo.screenshot({
    path: `./media/images/${ID}.png`,

    // fullPage: true,
  });

  await page.close();

  await browser.close();
};

Screenshot();
