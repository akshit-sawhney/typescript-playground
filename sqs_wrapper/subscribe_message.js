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
        sqs.subscribe('media-service-try-akshit', function(msg) {
            console.log('hello world', msg);
        }, {
            maxInProgress: 1,
          });   
    } catch (error) {
        console.log('fucked up');
    }
},5000);

