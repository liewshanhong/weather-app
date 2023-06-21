const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5005e82b4579e342a388c3f12281ef95&query=' + lat + ',' + long

    request({url, json: true}, (error,{ body }) => {
        if(error){
            callback('Unable to connect to weather service.', undefined)
        }else if(body.error){
            callback('Unable to find location.', undefined)
        }else{
            callback(undefined, "It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees")
        }
    })
}

module.exports =  forecast