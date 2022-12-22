

const Akshit = require('../models/akshit');

const dynamoose = require('dynamoose');

dynamoose.aws.ddb();

async function createAkshit() {
    try {
        const myAkshit = new Akshit({
            id: '3',
            name: 'Akshit3'
        });
        const abc = await myAkshit.save();
        console.log("Save operation was successful.");
        return abc;
    } catch (error) {
        console.log('error: controller: ', error)
    }
        
}

async function getAkshit() {
    try {
        const results = await Akshit.query("id").eq("2").exec();
        console.log('response is: ', results);
    } catch (error) {
        console.log('error: controller: ', error)
    }
        
}

module.exports = {
    createAkshit,
    getAkshit
  };
