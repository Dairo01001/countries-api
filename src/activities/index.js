const ActivitiesRouter = require('express').Router()
const ActivitiesService = require('./services')

ActivitiesRouter.post('/', async (req, res) => {
  const { name, difficulty, duration, season, CountryId } = req.body

  try {
    const activity = await ActivitiesService.create({
      data: { name, difficulty, duration, season },
      CountryId
    })
    res.status(201).json(activity)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
})

ActivitiesRouter.get('/', async (req, res) => {
  res.json(await ActivitiesService.findAll())
})

ActivitiesRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const activity = await ActivitiesService.findOne(id)

    if (!activity) {
      return res.status(401).json({ msg: 'Activity not found!' })
    }

    res.json(activity)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
})

ActivitiesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    res.json(await ActivitiesService.remove(id))
  } catch (error) {
    res.status(401).json({ msg: error.message })
  }
})

ActivitiesRouter.put('/', async (req, res) => {
  const { id, name, difficulty, duration, season } = req.body
  const { CountryId, ActivityId } = req.body

  if (CountryId && ActivityId) {
    try {
      res.json(await ActivitiesService.removeCountry({ CountryId, ActivityId }))
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
  } else {
    try {
      res.json(await ActivitiesService.update({ id, name, difficulty, duration, season }))
    } catch (error) {
      res.status(401).json({ msg: error.message })
    }
  }
})

ActivitiesRouter.post('/setcountry', async (req, res) => {
  const { CountryId, ActivityId } = req.body
  try {
    res.json(await ActivitiesService.addCountry({ CountryId, ActivityId }))
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
})

module.exports = {
  ActivitiesRouter
}
