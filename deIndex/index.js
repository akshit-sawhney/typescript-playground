const readFileHandler = require("../s3/readFile").readFileHandler;
const uploadHtmlFile = require("../s3/upload_html");

const KEY = "deIndex/UH IPA BAB 1 KELAS 7 2021 pertanyaan & jawaban untuk kuis dan lembar soal - Quizizz.html";

async function main() {
  const s3File = await readFileHandler(KEY);
  var htmlContent = Buffer.from(s3File.Body).toString();
  const headTagPosition = htmlContent.indexOf("<head>");
  const skipIndeces = headTagPosition + 6;
  var txt2 =
    htmlContent.slice(0, skipIndeces) +
    '<meta name="robots" content="noindex">' +
    htmlContent.slice(skipIndeces);
  console.log("new value: ", txt2.substring(0, 150));
  const data = Buffer.from(txt2)

  uploadHtmlFile.uploadHtmlFile(data, KEY, 'html');
}
main();
