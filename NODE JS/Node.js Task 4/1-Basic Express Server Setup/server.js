const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.json({ message: "Welcome to Express Server" })
})

app.get('/status', (req, res) => {
  res.json({
    message: "Server is running",
    status: "OK"
  })
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})