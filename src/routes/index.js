const { ActivitiesRouter } = require('../activities')
const { CountriesRouter } = require('../countries')

const routes = require('express').Router()

routes.use('/countries', CountriesRouter)
routes.use('/activities', ActivitiesRouter)

module.exports = {
  routes
}
