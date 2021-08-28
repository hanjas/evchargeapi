const edrv = require('../common/edrv');
const Q = require('q');

exports.getChargeStations = (req, callback) => {
    edrv.fireAPI('/v1/chargestations', null, 'GET', (err, data, msg) => {
        if (err)
            return callback('FETCH_FAILURE', null, 'get charge stations failed.');

        return callback(null, data, 'get chargestations success.');
    });
}

exports.getConnectors = (req, callback) => {
    const csid = req.params.csid;

    getConnectors(csid, (err, data, msg) => {
        if (err)
            return callback('FETCH_FAILURE', null, 'get connectors failed.')

        return callback(null, data, 'get connectors success.')
    });
}

const getConnectors = (csid, callback) => {
    edrv.fireAPI(`/v1/chargestations/${csid}/connectors`, null, 'GET', callback);
}

exports.getChargeStationWithConnectors = (req, callback) => {

    edrv.fireAPI('/v1/chargestations', null, 'GET', (err, data, msg) => {
        if (err || data.ok == 'false')
            return callback('FETCH_FAILURE', null, 'get charge stations failed.');

        let promises = [];

        data.result.forEach((item) => {
            let p = Q.defer();
            getConnectors(item._id, p.makeNodeResolver());
            promises.push(p.promise);
        });

        Q.allSettled(promises).then((results) => {
            for (let idx in results) {
                if (results[idx].state != 'fulfilled')
                    return callback('FETCH_FAILURE', null, 'fetching connector details failed');

                let connectors = results[idx].value[0];

                if (connectors.ok == 'false')
                    continue;

                data.result[idx]['connectors']= connectors.result;
            }
            callback(null, data, 'done');
        })

    })

};

exports.getRateInfo = (req, callback) => {
    const { id } = req.params;

    edrv.fireAPI(`/v1/rates/${id}`, null, 'GET', (err, data, msg) => {
        if (err || data.ok == 'false')
            return callback('FETCH_FAILURE', null, 'get charge stations failed');
            
        callback(null, data.result, 'done');
    })
}