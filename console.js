const repl = require('repl');
require('dotenv').config();
const models = require('./db/models/index.js');
const sequelize = require('sequelize');

Object.keys(models).forEach(modelName => {
  global[modelName] = models[modelName];
});

global['Op'] = sequelize.Op;

let replServer = repl.start({
  prompt: 'app > '
});

replServer.context.db = models;
