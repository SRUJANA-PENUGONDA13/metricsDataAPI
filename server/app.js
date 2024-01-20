// app.js
const express = require('express')
const bodyParser = require('body-parser')
const expressionsRouter = require('./routes/expressions')
const { db } = require('./models/db')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

// // Connect to PostgreSQL database
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to PostgreSQL:', err)
//     return
//   }
//   console.log('Connected to PostgreSQL database')
// })

// Use expressions router
app.use('/', expressionsRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
