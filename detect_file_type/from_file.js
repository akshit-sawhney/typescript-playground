var detect = require('detect-file-type');
const readFileHandler = require("../s3/readFile").readFileHandler;
const axios = require('axios');

async function main() {
    const failureArray = [
      "_media/quizzes/116b56e8-f290-4f9b-9b1e-08a664b35129-v2",
      "_media/quizzes/da1381f7-b8c2-48e1-9272-c09a0b0d246a-v2",
      "_media/quizzes/f8450f50-254f-472e-8153-95d9ac017733-v2",
      "_media/quizzes/3a0d1768-b24f-4304-97c5-6e4513ac3432-v2",
      "_media/quizzes/a741998a-8ab2-47df-91df-14ba3f250b31-v2",
      "_media/quizzes/1c1eb177-fbff-46d1-9720-fe28c6c1458a-v2",
      "_media/quizzes/bb72cbae-46a8-462d-b087-70c591ecdbd0-v2",
      "_media/quizzes/f9fdb89d-47f1-4860-908e-ffc8f28ee26a-v2",
      "_media/quizzes/b66c83ff-46d9-413f-b206-c75e5b28c86f-v2",
      "_media/quizzes/0d52acf9-7f87-48b8-9eaf-d324a7ef01e2-v2",
      "_media/quizzes/0e6e36d8-6163-4028-bf13-21d52ef240d4-v2",
      "_media/quizzes/270f4053-0199-47cb-89f1-a7367d59e1df-v2",
      "_media/quizzes/1ba7cb78-98e1-4881-9054-d8273350f5eb-v2",
      "_media/quizzes/a383e0d6-73cb-4bef-a04a-54d5299a7355-v2",
      "_media/quizzes/34ff088b-fbb2-4bc6-b134-d6dc8a3a0660-v2",
      "_media/quizzes/7099e22d-901b-422a-bf85-622b5497e7c6-v2",
      "_media/quizzes/12dd117a-9d65-4af3-a946-1c472d52619d-v2",
      "_media/quizzes/1947b4a5-5cdb-4e73-8a9a-8149bb916b8b-v2",
      "_media/quizzes/03278cb2-edd0-44fe-ace5-48d003c875c8-v2",
      "_media/quizzes/8ea6c132-4f01-4ae4-9db8-6e86ba8f3b87-v2",
      "_media/quizzes/8b864d90-312a-4175-b8ae-994cc7ac01e7-v2",
      "_media/quizzes/6a0c6c21-8630-48e5-9ba1-757d6c28dc3a-v2",
      "_media/quizzes/2f6983b0-1c6b-4c1e-b6b8-8dd4f0be5dcc-v2",
      ]

        for(let i=0; i< failureArray.length; i++) {
            // console.log('file: ', failureArray[i]);
            const s3File = await readFileHandler(failureArray[i]);
            detect.fromBuffer(s3File.Body, function(err, result) {

                if (err) {
                return console.log(err);
                }
                // if (result && result.ext === 'webp') {
                //     console.log('my Result: ', failureArray[i]);
                //     try {
                //         const data = {
                //             "action": "convert",
                //             "request": {
                //               "media_type": "image",
                //               "image": {
                //                 "s3_url": `https://quizizz-static.s3.amazonaws.com/${failureArray[i]}`,
                //                 "s3_key": failureArray[i],
                //                 "conversion_strategy": "sharp"
                //               },
                //               "retry_count": 0
                //             }
                //           }
                //         console.log(JSON.stringify(data));
                        
                //         axios.post('https://media.quizizz.com/_mdworker/main/_media_queue/publish', data)
                //           .then(res => {
                //             console.log('respons: ', res);
                //           })
                //           .catch(err => {
                //             console.log('error: ', err);
                //           })
                //       } catch (err) {
                //         return new Error(err);
                //       }
                // }
                if (!result) {
                  console.log(failureArray[i]);
                }
            
                // console.log(result);
            });
        }
    
}
main();