const edrv = require('../common/edrv');
const appconfig = require('../config/appconfig');

exports.getToken = (req, callback) => {
    const token = edrv.getBearerToken();
    callback(null, {token}, 'success');
}