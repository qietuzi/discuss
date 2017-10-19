const log4js = require('log4js')
const config = require('../config')

log4js.configure(config.log4js);
var logger = log4js.getLogger('default');

module.exports = logger;
