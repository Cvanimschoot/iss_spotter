// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
*/

/*
fetchCoordsByIP('199.126.248.175', (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log(data);
});
*/

/*
const coords = { latitude: '53.544389', longitude: '-113.4909267' };
fetchISSFlyOverTimes(coords, (error, flyTimeArray) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log(flyTimeArray);
});
*/
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});