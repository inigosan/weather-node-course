// On terminal:
// npm init -y
// npm i express
// npm i hbs
// npm i request

// node-course/web-server/src/app.js
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// Setup hbs engine and views location
app.set('view engine','hbs') // Tells Express to use hbs as templeting engine
app.set('views', viewsDirectoryPath) // Tells Express to use viewsDirectoryPath for dynamic views
hbs.registerPartials(partialsDirectoryPath) // Tells Express to use partialsDirectoryPath for dynamic partials

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //Exposes files in the public directory

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Inigo Sanchez'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About Me',
        name: 'Inigo Sanchez'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Inigo Sanchez',
        message: 'If you run into any issues, please contact Inigo Sanchez'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send ({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page',
        name: 'Inigo Sanchez',
        message: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not found',
        name: 'Inigo Sanchez',
        message: '404 Page Not Found'
    })
})

// Start up the server has it listen on a specific port (in this case port 3000 works for our development environment)
app.listen(3000, () => { 
    console.log('Server is up on port 3000.')
})

// On terminal:
// nodemon src/app.js -e js,hbs
//
// Go to localhost:3000 to view on browser


