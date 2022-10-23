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

module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };