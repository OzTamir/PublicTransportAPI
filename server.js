'use strict';
const config = require('./config');
const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('API Token: ' + config.token
    + '\nAPI Endpoint: ' + config.endpoint);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);