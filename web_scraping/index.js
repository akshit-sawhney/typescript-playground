const htmlparser = require('htmlparser2');
const axios = require('axios');

const URL = 'https://quizizz.com';

function removeDuplicates(arr) {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}

// Function to scrape a webpage and get all text nodes as an array
async function scrapeWebpage(html) {
  return new Promise((resolve, reject) => {
    const textNodes = [];
    let insideScriptTag = false;

    const parser = new htmlparser.Parser({
      ontext: (text) => {
        // Add text content to the array if not inside a script tag
        if (!insideScriptTag) {
          if (text.trim()) {
            textNodes.push(text.trim());
          }
        }
      },
      onopentag: (name, attribs) => {
        // Set a flag if an open script tag is encountered
        if (name.toLowerCase() === 'script' || name.toLocaleLowerCase() === 'style') {
          insideScriptTag = true;
        }
      },
      onclosetag: (tagname) => {
        // Reset the flag when a script tag is closed
        if (tagname.toLowerCase() === 'script' || tagname.toLocaleLowerCase() === 'style') {
          insideScriptTag = false;
        }
      },
      onend: () => {
        resolve(textNodes);
      }
    }, { decodeEntities: true });
    // Parse the HTML content
    parser.write(html);
    parser.end();
  });
}

async function getHtmlData(url) {
  const response = await axios.get(url)
  return response.data;
}

async function main() {
  const htmlData = await getHtmlData(URL);
  const textNodes = await scrapeWebpage(htmlData);
  console.log('text nodes: ');
  for (const textNode of textNodes) {
    console.log(textNode);
  }
  const uniqueTextNodes = removeDuplicates(textNodes);
  console.log('done: ', uniqueTextNodes.length);
}

main()
  .then(res => {
    console.log('done');
    process.exit(0);
  })
  .catch(err => {
    console.log('somethingWentWrong');
    console.log(err);
    process.exit(1);
  });
