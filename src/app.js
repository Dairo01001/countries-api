const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { PORT } = require('./config')
const { routes } = require('./routes')
const { allowOrigin, unknowEndPoint } = require('./middlewares')

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.set('port', PORT)
app.use(allowOrigin)

app.use('/api', routes)

app.use(unknowEndPoint)

module.exports = {
  app
}
