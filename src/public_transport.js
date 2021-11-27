'use strict';

const got = require('got');
const config = require('./config');

function getRawStationInformation(stationId, callback) {
    console.log('getRawStationInformation:', stationId);
    return got(`${config.endpoint}?Key=${config.token}&MonitoringRef=${stationId}`).then(function(response) {
      return callback(JSON.parse(response.body));
    });
}

function getStationInformation(stationId) {
    console.log('getStationInformation:', stationId);  
    return getRawStationInformation(stationId, function(json) {
        return JSON.stringify({
            id: stationId,
            anyResults: json.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit.length > 0,
            stops: json["Siri"]["ServiceDelivery"]["StopMonitoringDelivery"][0]["MonitoredStopVisit"],
            raw: json
          });
    });
};

function calculateTimeToStation(recordTime, expectedArrivalTime) {
    var time = new Date(recordTime);
    var timeToStation = new Date(expectedArrivalTime) - time;
    return timeToStation;
};

function getTimeToStation(stationId, lineId) {
    console.log('getTimeToStation:', stationId, lineId);
    return getRawStationInformation(stationId, function(json) {
        const stops = json["Siri"]["ServiceDelivery"]["StopMonitoringDelivery"][0]["MonitoredStopVisit"];
        var lineInfo = [];
        stops.forEach(element => {
            if (element.MonitoredVehicleJourney.PublishedLineName == lineId) {
                lineInfo.push({
                    tts: calculateTimeToStation(
                        element.RecordedAtTime,
                        element.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
                    ),
                    raw: element
                });
            }
        });

        return JSON.stringify({
            id: stationId,
            lineId: lineId,
            results: lineInfo
        });
    });
}

module.exports = {
    getStationInformation: getStationInformation,
    getTimeToStation: getTimeToStation
};