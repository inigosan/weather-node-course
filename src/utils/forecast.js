// web-server/src/utils/forecast.js
const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d01f6b0a8a10a365ebdd236be4c29d61&query=' + latitude + ',' + longitude + '&units=f'
    request ({url, json: true}, (error, {body}) => {
        if (error) {
            callback ('Unable to connect to weather service!')
        } else if (body.error) {
            callback ('Unable to find location!')
        } else {
            callback (undefined, body.current.weather_descriptions[0] + ": It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast