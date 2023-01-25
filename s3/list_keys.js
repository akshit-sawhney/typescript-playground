const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const constants = require("../constants");
AWS.config.update({ region: constants.AWS_REGION });

// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

let executionLimit = 10;

async function getAllKeys(params, allKeys = []) {
  if (executionLimit) {
    console.log("hit here: ", executionLimit);
    // console.log('all keys: ', allKeys);
    executionLimit--;
    const response = await s3.listObjectsV2(params).promise();
    response.Contents.forEach((obj) => allKeys.push(obj.Key));
    if (response.NextContinuationToken) {
      params.ContinuationToken = response.NextContinuationToken;
      await getAllKeys(params, allKeys); // RECURSIVE CALL
    }
  } else {
    const originalKeys = [];
    for (let i = 0; i < allKeys.length; i++) {
      const key = allKeys[i];
      if (key.includes("_90") || key.includes("_200") || key.includes("_400")) {
        console.log("ignored key: ", key);
      } else {
        originalKeys.push(key);
      }
    }
    for (let i = 0; i < originalKeys.length; i++) {
      var params = {
        // Remove DelaySeconds parameter and value for FIFO queues
        DelaySeconds: 10,
        MessageBody: JSON.stringify({
          Records: [
            {
              eventName: "ObjectCreated:Put",
              s3: {
                object: {
                  key: originalKeys[i],
                },
              },
            },
          ],
        }),
        QueueUrl:
          "https://sqs.us-east-1.amazonaws.com/399771530480/media-service-try-akshit",
      };

      sqs.sendMessage(params, function (err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.MessageId);
        }
      });
    }
    console.log("final return: ", originalKeys);
    return originalKeys;
  }
}

async function main() {
  const abc = await getAllKeys({
    Bucket: "quizizz-static",
    Prefix: "_media/quizzes",
    MaxKeys: 100,
  });
  console.log("done: ", abc);
}

main();
