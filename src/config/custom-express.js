const express = require('express');
const app = express();

require('marko/node-require').install();
require('marko/express');

const rotas = require('../app/rotas/rotas.js');

rotas(app);

module.exports = app;