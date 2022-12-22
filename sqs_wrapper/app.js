const SQS = require('@akshendra/sqs');
const { EventEmitter } = require('events');

const emitter = new EventEmitter();

emitter.on('log', (payload) => console.log(payload));
emitter.on('success', (payload) => console.info(payload));
emitter.on('error', (payload) => console.error(payload));

const sqs = new SQS('sqs', emitter, {});
sqs.init();
setTimeout(function() {
    try {
        console.log('here: ', sqs);
        // console.log(sqs.getQueueUrl('media-service-try-akshit'));   
    } catch (error) {
        console.log('fucked up');
    }
},1);

