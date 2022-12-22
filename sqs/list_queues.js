// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const constants = require('../constants');
const logger = require("../helpers/logger");
// Set the region 
AWS.config.update({region: constants.AWS_REGION});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {};

sqs.listQueues(params, function(err, data) {
  if (err) {
    logger.errorj("List Queues fail response: ", err);
  } else {
    logger.infoj("List Queues success response: ", data.QueueUrls);
  }
});