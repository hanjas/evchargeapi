const request = require('request');
const appconfig = require('../config/appconfig');

exports.token = null;

const fireFormAPI = (url, formbody, callback) => {
    const options = {
        method: 'POST',
        url, 
        form: formbody,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    request(options, (error, response) => {
        if (error) return callback(error, null, "failure");

        return callback(null, JSON.parse(response.body), "success");
    });

}
exports.fireFormAPI = fireFormAPI;

const fireAPI = (url, body, method, callback) => {
    var options = {
        method,
        body,
        'url': appconfig.edrv_api_host+url,
        'headers': {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getBearerToken()
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        callback(null, JSON.parse(response.body), 'done');
      });

}
exports.fireAPI = fireAPI;

const updateToken = () => {
    const url = appconfig.edrv_auth_host + "/oauth/token";
    const body = {
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        audience: 'https://api.edrv.io'
    }

    fireFormAPI(url, body, (err, data, msg) => {
        if (err)
            updateToken();
        else
            this.token = data.access_token;
        
    });
};

setInterval(updateToken, 86400);
updateToken();

const getBearerToken = () => {
    return this.token;
}
exports.getBearerToken = getBearerToken;