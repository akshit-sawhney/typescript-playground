const chalk = require("chalk");

const successChalk = chalk.keyword('lime');
const errorChalk = chalk.bold.red;

function info(data) {
    console.log(successChalk(data));
}

function infoj(text, data) {
    console.log(successChalk(text), successChalk(JSON.stringify(data)));
}

function error(data) {
    console.log(errorChalk(data));
}

function errorj(text, data) {
    console.log(errorChalk(text), errorChalk(JSON.stringify(data)));
}

module.exports = {
    info, error, infoj, errorj
}