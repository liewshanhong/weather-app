const path = require('path')
const express = require('express')
const hbs  = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express configuration
const pathDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pathDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shan Hong Liew'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            errorMessage: 'Please provide a valid address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                errorMessage: 'Please provide a valid address'
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    errorMessage: 'Please provide a valid address'
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
                
            })
        })
    })   
})

// app.get('/product', (req, res) => {
//     if(!req.query.search){
//         return res.send({
//             error: 'Please provide a search term.'
//         })
//     }
 
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: 'error',
        message: 'help article not found',
        name: 'Shan Hong Liew'
    })
})

app.get('*', (req, res) =>{
    res.render('error', {
        title: 'Error',
        message: 'Page not found',
        name: 'Shan Hong Liew'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port +'.')
})