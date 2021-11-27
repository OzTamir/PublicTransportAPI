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

/* Time to Station Endpoint */
app.get('/tts/:stationId/:lineName', (req, res) => {
  const stationId = req.params.stationId;
  const lineName = req.params.lineName;
  publicTransport.getTimeToStation(stationId, lineName).then(data => {
      res.send(data);
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);