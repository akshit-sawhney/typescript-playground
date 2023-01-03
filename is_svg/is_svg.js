const isSvg = require('is-svg');
const logger = require('../helpers/logger');

const value_1 = isSvg('<svg xmlns="http://www.w3.org/2000/svg"><path fill="#00CD9F"/></svg>');
logger.infoj('Value-1: ', value_1);