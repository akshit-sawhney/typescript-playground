// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const constants = require('../constants');
// Set the region
AWS.config.update({region: constants.AWS_REGION});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/399771530480/media-service-try-akshit'
 };

sqs.deleteQueue(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
