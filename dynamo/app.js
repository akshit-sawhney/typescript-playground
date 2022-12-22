const dynamoose = require('dynamoose');
const env = require('dotenv');
const constants = require('../constants');

process.env.AWS_REGION = constants.AWS_REGION;



const akshitController = require('./controllers/akshit_controller');

async function createFunction() {
    try {
        const res = await akshitController.createAkshit()
        console.log('success: app: ', res);   
    } catch (error) {
        console.log('error: app: ', error);
    }
}

async function getAkshit() {
    try {
        const res = await akshitController.getAkshit()
        console.log('success: app: ', res);   
    } catch (error) {
        console.log('error: app: ', error);
    }
}

// createFunction();
getAkshit();
