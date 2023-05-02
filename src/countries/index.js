const CountriesRouter = require('express').Router()
const CountriesService = require('./services')

CountriesRouter.get('/', async (req, res) => {
  const { name } = req.query
  try {
    if (!name) {
      const countries = await CountriesService.findAll()
      return res.json(countries)
    }

    const countries = await CountriesService.findByName(name)
    res.json(countries)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
})

CountriesRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const country = await CountriesService.findOne(id)

    if (!country) {
      return res.status(401).json({ msg: 'Country not found!' })
    }

    res.json(country)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
})

module.exports = {
  CountriesRouter
}
