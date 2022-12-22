const dynamoose = require('dynamoose');
const env = require('dotenv');
const constants = require('../constants');
const logger = require('../helpers/logger');

process.env.AWS_REGION = constants.AWS_REGION;



const akshitController = require('./controllers/akshit_controller');

async function createFunction() {
    try {
        const res = await akshitController.createAkshit()
        logger.infoj('Get Call success response: ', res);  
    } catch (error) {
        logger.errorj('Get Call error response: ', error);
    }
}

async function getAkshit() {
    try {
        const res = await akshitController.getAkshit()
        logger.infoj('Get Call success response: ', res);
    } catch (error) {
        logger.errorj('Get Call error response: ', error);
    }
}

createFunction();
// getAkshit();
