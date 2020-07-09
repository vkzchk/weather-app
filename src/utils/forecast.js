const request = require('request')
const forecast = (lalitude, longitude, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=8f8bc73b42385582f23c77c261e9a8c4&query=${lalitude},${longitude}`

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      cb('Unable to connect to weater service!')
    } else if (body.error) {
      cb('Unable to find location. Try another search.')
    } else {
      const { weather_descriptions, temperature, feelslike } = body.current

      cb(
        '',
        `${weather_descriptions[0]}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out`
      )
    }
  })
}

module.exports = forecast
