const puppeteer = require("puppeteer");

const quizIds = [
  '635f8bf12ebf160023153251',
  '635f8bc076b322001d7a93b7',
  '635f8c1eeee1aa001d68c455',
  '573a70d32270dbcceb73a3c6',
  '628c3812fbb2ac001ee00a17',
  '6202816a3c30f60020c2446e',
  '5f62cafeb257cd001d2a7c8e',
  '60dc4bb0e3a93a001b715bc7',
  '5e67c53bad7368001b4130ba',
  '5c3f666a3d2d78001b1bc66d'
]

let browser;
let page;

const initialSetup = async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
}

const closeSetup = async () => {
  await page.close();
  await browser.close();
}

const Screenshot = async (quizId) => {
  const pageUrl = `https://quizizz.com/print/worksheet/${quizId}`

  await page.goto(pageUrl);

  await page.waitForSelector("#worksheet-id");

  await page.screenshot({
    path: `./media/images/${quizId}.png`,

    fullPage: true,
  });
};

async function main() {
  await initialSetup();
  console.time('screenshot');
  for (let i=0; i< quizIds.length; i++) {
    await Screenshot(quizIds[i]);
  }
  console.timeEnd('screenshot');
  await closeSetup();
}

main();
