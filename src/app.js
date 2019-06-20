const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express Config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static pages directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mike Gorman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mike Gorman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help topics',
        title: 'Help',
        name: 'Mike Gorman'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
          })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', { 
        errorMessage: 'Help article not found',
        title: 'Help 404',
        name: 'Mike Gorman'
    })
})

app.get('*', (req, res) => {
    res.render('404', { 
        errorMessage: 'Page not found',
        title: '404',
        name: 'Mike Gorman'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})


