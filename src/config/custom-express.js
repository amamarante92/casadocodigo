require('marko/node-require').install();
require('marko/express');

const express = require('express');
const app = express();
const rotas = require('../app/rotas/rotas.js');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}))

rotas(app);

module.exports = app;