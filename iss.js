const request = require('request');
const url = 'https://api.ipify.org?format=json';

const fetchMyIP = function(callback) {
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else {
      const data = JSON.parse(body);
      const ip = data.ip;
      callback(null, ip);
    }
  });
};

module.exports = { fetchMyIP };