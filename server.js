'use strict';
const express = require('express');
const publicTransport = require('./public_transport');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
  res.send('API Token: ' + config.token
    + '\nAPI Endpoint: ' + config.endpoint);
});

app.get('/station/:stationId', (req, res) => {
  const stationId = req.params.stationId;
  publicTransport.getStationInformation(stationId).then(data => {
      res.send(data);
  });
});

app.get('/line/:lineId', (req, res) => {
  const lineId = req.params.lineId;
  publicTransport.getStationInformation(lineId).then(data => {
      res.send(data);
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);