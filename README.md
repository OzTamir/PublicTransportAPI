# PublicTransportAPI
 Dockerized API for Israeli Public Transport. Works by implementing a wrapper around the Ministry of Transportation (MoT) API.

# Obtaining a key for the MoT API
In order to retrieve the information needed to run this API wrapper, you'd need to acquire a token from the Ministry of Transportation [website](https://www.gov.il/he/departments/general/real_time_information_siri). Please note that you might be required to give an IP address from which your requests will be made.

After applying for an API key, you would recieve the endpoint URL and an API key, both can be configured under ```config.js```:
```javascript
const API_TOKEN = "DM1234"
const API_ENDPOINT = "http://API_ENDPOINT/2.8/json"
```

# Running PTAPI
## Docker
As this app is dockerized, running PTAPI is as easy as running a docker:
```bash
docker build . -t public-transport-api
docker run -p 80:8080 public-transport-api
```
## Plain Node
If, for some reason, you chose to run this as a regular node app, the flow is just as simple:
```bash
npm install
node server.js
```

By default, the server will listen on port ```8080```, this is configurable (can be set in ```server.js```).

# API Reference
## ```GET - /station/:stationId```
This endpoint can be used to retrieve information on a specific bus stop.

Returns a JSON with the following fields:

    - id: Set to stationId
    - anyResults: true if there are upcoming buses, false otherwise
    - stops: Information about buses that stop in the station in the near future
    - raw: The raw response from the MoT API

## ```GET - /tts/:stationId/:lineName```
This endpoint can be used to figure out how long until a certin bus reaches a certin stop. Please note that ```lineName``` is the actual line name rather than an ID.

Returns a JSON with the following fields:

    - id: Set to stationId
    - lineId: Set to lineName
    - results: An array of buses with that name that are set to stop at the station.

Each entry in the ```results``` is an object with the following fields:

    - tts: Time (in miliseconds) to station (relative to the last report from the bus, not to current time).
    - raw: The raw bus entry from the MoT API