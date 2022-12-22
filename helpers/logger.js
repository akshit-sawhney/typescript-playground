const chalk = require("chalk");

const successChalk = chalk.keyword('lime');
const errorChalk = chalk.bold.red;

function info(data) {
    console.log(successChalk(data));
}

function error(data) {
    console.log(errorChalk(data));
}

module.exports = {
    info, error,
}