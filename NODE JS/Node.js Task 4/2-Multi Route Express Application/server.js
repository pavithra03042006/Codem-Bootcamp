const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next) => {
  console.log(`Accessed route: ${req.url}`)
  next()
})

app.get('/home', (req, res) => {
  res.status(200).json({
    route: 'home',
    message: 'Welcome to Home Page',
    timestamp: new Date().toISOString()
  })
})

app.get('/about', (req, res) => {
  res.status(200).json({
    route: 'about',
    message: 'Welcome to About Page',
    timestamp: new Date().toISOString()
  })
})

app.get('/contact', (req, res) => {
  res.status(200).json({
    route: 'contact',
    message: 'Welcome to Contact Page',
    timestamp: new Date().toISOString()
  })
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    timestamp: new Date().toISOString()
  })
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})