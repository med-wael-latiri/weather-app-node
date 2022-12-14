const request = require("request");
const forecast = (lantitude, longitude, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lantitude +
    "&lon=" +
    longitude +
    "&appid=5ca49316ce8de9ee889cfd9e1b75d847&units=metric&lang=eng";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect");
    } else if (body.message) {
      callback("Unable to find location");
    } else {
      callback(
        undefined,
        body.weather[0].description +
          ` It is currently ${body.main.temp} degree with a humidity of ${body.main.humidity}.  
           the lowest temperature today was ${body.main.temp_min} degrees and the highest temperature today was ${body.main.temp_max} degrees
          the wind speed is ${body.wind.speed} `
      );
    }
  });
};

module.exports = forecast;
