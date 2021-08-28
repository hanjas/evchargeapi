const express = require('express');
const http = require('http');
const bodyParse = require('body-parser');
const dotenv = require('dotenv').config();


let app = express();
let server = http.Server(app);
const port = (process.env.PORT) ? process.env.PORT : 3003;


app.use( bodyParse.urlencoded({ extended: true }) );
app.use( bodyParse.json() );
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Header", "Origin")
    next()
})

require('./app/login/loginRoutes')(app);
require('./app/api/apiRoutes')(app);

server.listen(port, () => {
    console.info(`apiplatform is listening on the port ${port}`);
})