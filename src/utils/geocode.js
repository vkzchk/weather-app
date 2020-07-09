const request = require('request')
const geocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoid29vb2ZhaCIsImEiOiJja2M3dHVianIwb2l3MnhwaHg0cjE5ZzhtIn0.V784MQ4oIqMlbEbCSgPZPg&limit=1`

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      cb('Unable to connect to weater services!')
    } else if (!body.features.length) {
      cb('Unable to find location. Try another search.')
    } else {
      const { center, place_name } = body.features[0]

      cb('', {
        latitude: center[1],
        longitude: center[0],
        location: place_name,
      })
    }
  })
}

module.exports = geocode
