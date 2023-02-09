const Akshit = require("../models/akshit");

const dynamoose = require("dynamoose");

dynamoose.aws.ddb();

async function createAkshit() {
  const myAkshit = new Akshit({
    id: "3",
    name: "Akshit3",
  });
  const abc = await myAkshit.save();
  return abc;
}

async function getAkshit() {
  const results = await Akshit.scan("status").eq("failed").count().exec();
  return results;
}

module.exports = {
  createAkshit,
  getAkshit,
};
