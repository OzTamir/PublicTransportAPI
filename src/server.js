'use strict';
const express = require('express');
const publicTransport = require('./public_transport');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
  console.log(`[DEBUG] Got request: /`);
  res.send(`
    <h1>Public Transport API</h1>
    <p>
      For more information: <a href="https://github.com/OzTamir/PublicTransportAPI">PublicTransportAPI</a>.
    </p>
   `);
});

app.get('/station/:stationId', (req, res) => {
  const stationId = req.params.stationId;
  console.log(`[DEBUG] Got request: /station/${stationId}`);
  publicTransport.getStationInformation(stationId).then(data => {
      res.send(data);
  });
});

/* Time to Station Endpoint */
app.get('/tts/:stationId/:lineName', (req, res) => {
  const stationId = req.params.stationId;
  const lineName = req.params.lineName;
  console.log(`[DEBUG] Got request: /tts/${stationId}/${lineName}`);
  publicTransport.getTimeToStation(stationId, lineName).then(data => {
      res.send(data);
  });
});

app.listen(PORT, HOST);
console.log(`[INFO] Starting PublicTransport API`)
console.log(`[INFO] Running on http://${HOST}:${PORT}`);