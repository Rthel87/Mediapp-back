const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes.js');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: process.env.CORS_ORIGINS, optionsSuccessStatus: 200 }));

app.use('/', router);

app.listen(port);
console.log('Inicio de la aplicación. Escuchando puerto ' + port);
