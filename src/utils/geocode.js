const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFnb3JtYW4iLCJhIjoiY2p3OXR1NnJoMDE0eTQzbjJwYmduM3N1bSJ9.HDmNXHO1JZqdV8_BuXrM4w&limit=1'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to match location. Enter a new search')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }   
    })
}

module.exports = geocode