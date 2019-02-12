//Dependencies
const crypto = require('crypto');
const config = require ('../config')

const helpers = {};
helpers.hash = function (str) {
    if (typeof (str) == 'string' && str.trim.length() > 0) {
        crypto.createHmac('sha256', config.secret)
            .update(str)
            .digest('hex');
        console.log(hash);
    } else {
        return false;
    }
}

module.exports = helpers;