const mime = require('mime');
const getMime = require('name2mime');
// const second = require('./second');


const abc = mime.getType('https://quizizz-static.s3.amazonaws.com/_media/quizzes/00000051-f8b7-4f56-8355-e32f1c8674be');
console.log('here: ', abc);

const xyz = getMime('https://quizizz-static-dev.s3.amazonaws.com/_media/quizzes/42e503a1-eae2-4966-ac9c-6203870244c7-v2');
console.log('here: ', xyz);

// second.getMime();