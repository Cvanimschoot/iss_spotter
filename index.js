// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
*/

fetchCoordsByIP('199.126.248.175', (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log(data);
});