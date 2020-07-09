const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/patrials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Viacheslav K',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Viacheslav K',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    message: 'This is some helpful text',
    name: 'Viacheslav K',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    })
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }
      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({ error })
        }
        res.send({
          forecast,
          location,
          address: req.query.address,
        })
      })
    }
  )
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    })
  }
  console.log(req.query.search)
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found.',
    name: 'Viacheslav K',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found.',
    name: 'Viacheslav K',
  })
})

app.listen(3000, () => {
  console.log('Server is running..')
})
