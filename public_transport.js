'use strict';

const got = require('got');
const config = require('./config');

function getStationInformation(stationId) {
    console.log('getStationInformation:', stationId);  
    return got(`${config.endpoint}?Key=${config.token}&MonitoringRef=${stationId}`).then(function(response) {
      const json = JSON.parse(response.body);
      return JSON.stringify({
        id: stationId,
        anyResults: json.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit.length > 0,
        stops: json["Siri"]["ServiceDelivery"]["StopMonitoringDelivery"][0]["MonitoredStopVisit"],
        raw: json
      });
    });
};

module.exports = {
    getStationInformation: getStationInformation
};