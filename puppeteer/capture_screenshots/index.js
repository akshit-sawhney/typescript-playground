const puppeteer = require("puppeteer");

const URL = "https://quizizz.com/print/worksheet/635f8bf12ebf160023153251";
const ID = "asdf";

const Screenshot = async () => {
  console.time('screenshot');
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(URL);

  await page.waitForSelector("#worksheet-id");

  await page.screenshot({
    path: `./media/images/${ID}.png`,

    fullPage: true,
  });

  await page.close();

  await browser.close();
  console.timeEnd('screenshot');
};

Screenshot();
