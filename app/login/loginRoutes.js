module.exports = (app) => {

    const utils = require('../common/utils');
    const login = require('./login');

    app.get('/token',
        utils.simplifiedCallback( login.getToken )
    );

    console.log(`login routes loaded`);
}