var detect = require('detect-file-type');
const readFileHandler = require("../s3/readFile").readFileHandler;

async function main() {
    const s3File = await readFileHandler("_media/quizzes/bc6ee929-587c-4728-9ff8-e6927c67e1e8-v2");
    detect.fromBuffer(s3File.Body, function(err, result) {

        if (err) {
          return console.log(err);
        }
    
        console.log(result);
      });
}
main();