const { URL_FRONT } = require('../config')

const unknowEndPoint = (req, res) => {
  res.status(404).json({ msg: 'Unknow end point!' })
}

const allowOrigin = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', URL_FRONT)
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
  next()
}

module.exports = {
  unknowEndPoint,
  allowOrigin
}
