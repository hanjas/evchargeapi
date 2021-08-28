module.exports = (app) => {

    const utils = require('../common/utils');
    const api = require('./api');

    app.get('/api/chargestation',
        utils.simplifiedCallback( api.getChargeStationWithConnectors )
    );

    app.get('/api/chargestations',
        utils.simplifiedCallback( api.getChargeStations )
    );

    app.get('/api/connectors/:csid',
        utils.simplifiedCallback( api.getConnectors )
    );

    app.get('/api/rate/:id',
        utils.simplifiedCallback( api.getRateInfo )
    );

    console.log('api routes loaded');
}