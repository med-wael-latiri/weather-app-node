const request = require("request");
const geocode = (adress, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(adress) +
    ".json?access_token=pk.eyJ1Ijoid2FlbDkzIiwiYSI6ImNsOHB0bWFmODAxdHYzd3BnZWRidHI0MGsifQ.gNmpdx5d5bhWaHO0H9yhtw";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find locatoin.try another search", undefined);
    } else {
      callback(undefined, {
        lantitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        Nameplace: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
