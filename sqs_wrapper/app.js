const SQS = require('@akshendra/sqs');
const { EventEmitter } = require('events');

const emitter = new EventEmitter();

emitter.on('log', (payload) => console.log(payload));
emitter.on('success', (payload) => console.info(payload));
emitter.on('error', (payload) => console.error(payload));

const sqs = new SQS('sqs', emitter, {});
sqs.init()
.then(res => {
    console.log('here: ', sqs);
    console.log('here: ', res);
})
.catch(err => {
    console.log('fucked up');
})

