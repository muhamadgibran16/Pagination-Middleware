require('dotenv').config()
const express = require('express')
const app = express()
const user = require('../src/routes/index')

app.use(express.json())
app.use('/v1', user)

app.get('/', (req, res) => {
  console.log('Response success')
  res.send('Response success')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`)
})