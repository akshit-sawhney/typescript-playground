const topImagesArray = require("../media/texts/top_images").topImagesArray;

var AWS = require("aws-sdk");
const constants = require("../constants");
// Set the region
AWS.config.update({ region: constants.AWS_REGION });

// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

async function sendMessage(key) {
  // Load the AWS SDK for Node.js

  var params = {
    // Remove DelaySeconds parameter and value for FIFO queues
    DelaySeconds: 10,
    MessageBody: JSON.stringify({
      Records: [
        {
          eventName: "ObjectCreated:Put",
          s3: {
            object: {
              key: key,
            },
          },
        },
      ],
    }),
    QueueUrl:
      "https://sqs.us-east-1.amazonaws.com/399771530480/media-service-try-akshit",
  };
  console.log("params got: ", JSON.stringify(params));

  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.MessageId);
    }
  });
}

async function main() {
  for (let i = 9995; i < topImagesArray.length; i++) {
    await sendMessage(topImagesArray[i]);
  }
}

main();
