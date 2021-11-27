'use strict';
const config = require('./config');
const express = require('express');
const got = require('got');

function getStationInformation(stationId) {
  console.log('getStationInformation:', stationId);  
  return got(`${config.endpoint}?Key=${config.token}&MonitoringRef=${stationId}`).then(function(response) {
    const json = JSON.parse(response.body);
    return JSON.stringify({
      id: stationId,
      stops: json["Siri"]["ServiceDelivery"]["StopMonitoringDelivery"][0]["MonitoredStopVisit"]
    });
  });
}

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
  getStationInformation(stationId).then(data => {
      res.send(data);
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);