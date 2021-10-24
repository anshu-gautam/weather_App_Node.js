const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0e3a0e64d5a98eaa16211cbab11c4894&query=${longitude},${latitude}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect weather services", undefined);
    } else if (response.body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0] +
          ". temperature is " +
          response.body.current.temperature +
          ". Its feel like : " +
          response.body.current.feelslike +
          ". out there"
      );
    }
  });
};

module.exports = forecast;

// const url = 'http://api.weatherstack.com/current?access_key=0e3a0e64d5a98eaa16211cbab11c4894&query=25.387877,%2086.127581&'
// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('unable to connect to weather service')

//     } else if (response.body.error) {
//         console.log('unable to find location')

//     } else {
//         console.log(response.body.current.weather_descriptions[0] + ". temperature is " + response.body.current.temperature + ". Its feel like : " + response.body.current.feelslike + ". out there")
// const data = JSON.parse(response.body)
// console.log(data.current)
// console.log(data.location)
//     }

// })
