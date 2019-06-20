const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/06d616148e713531e00c6a6deba5d2fb/' + latitude +',' + longitude

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connection to the weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temperature = body.currently.temperature
            const rainProbability = body.currently.precipProbability
            const summary = body.daily.data[0].summary
            callback(undefined, `${summary} It is currently ${temperature} degrees out. There is a ${rainProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast