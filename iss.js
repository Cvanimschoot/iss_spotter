const request = require('request');

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const ip = data.ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const url = "http://ipwho.is/" + ip;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);

    if (!data.success) {
      const msg = `${ip} returned unsucessful. Please check ip address.`;
      callback(Error(msg), null);
      return;
    }

    const coords = {
      latitude: data.latitude,
      longitude: data.longitude
    };
    callback(null, coords);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url =  'https://iss-flyover.herokuapp.com/json/?lat=' + coords.latitude + '&lon=' + coords.longitude;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);

    if (data.message !== "success") {
      const msg = `${coords} returned unsucessful. Please check coords.`;
      callback(Error(msg), null);
      return;
    }

    const flyTime = data.response;
    callback(null, flyTime);
  });
};

// iss.js 

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
 const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, flyTimeArray) => {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, flyTimeArray);
      })
    })
      


  })
 };
module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };
module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };