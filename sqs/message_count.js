// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const constants = require('../constants');
const logger = require("../helpers/logger");
// Set the region 
AWS.config.update({region: constants.AWS_REGION});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/399771530480/media-service-prod',
    AttributeNames : ['ApproximateNumberOfMessages'],
   };

sqs.getQueueAttributes(params, function(err, data) {
  if (err) {
    logger.errorj("Get Queue Attributes error: ", err);
  } else {
    logger.infoj("Get Queue Attributes response: ", data);
  }
});