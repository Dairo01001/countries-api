const CountriesService = require('../countries/services')

const { Activity, Country, CountryActivity } = require('../db')

async function findAll () {
  return await Activity.findAll({
    attributes: ['id', 'name', 'difficulty', 'duration', 'season']
  })
}

async function findOne (id) {
  return await Activity.findByPk(id, {
    include: [{
      model: Country,
      required: false,
      attributes: [
        'id',
        'name',
        'flag',
        'capital',
        'region',
        'subregion',
        'area',
        'population'
      ]
    }],
    attributes: ['id', 'name', 'difficulty', 'duration', 'season']
  })
}

async function create ({ data, CountryId }) {
  if (CountryId) {
    const country = await CountriesService.findOne(CountryId)

    if (!country) {
      throw new Error(`Country with id ${CountryId} not found`)
    }
    const newActivity = await Activity.create(data)
    await newActivity.addCountry(country)
    return newActivity
  }

  const newActivity = await Activity.create(data)
  return newActivity
}

async function remove (id) {
  const activity = await Activity.findByPk(id)

  if (!activity) {
    throw new Error('Activity does not exist!')
  }

  activity.destroy()

  return activity
}

async function removeCountry ({ CountryId, ActivityId }) {
  const countryAc = await CountryActivity.findOne({
    where: {
      CountryId,
      ActivityId
    }
  })

  if (!countryAc) {
    throw new Error('Not exist this relationship!')
  }

  await countryAc.destroy({
    where: {
      CountryId,
      ActivityId
    }
  })

  return countryAc
}

async function addCountry ({ CountryId, ActivityId }) {
  const countryAc = await CountryActivity.findOne({
    where: {
      CountryId,
      ActivityId
    }
  })

  if (countryAc) {
    throw new Error('This country already has this activity')
  }

  return await CountryActivity.create({
    CountryId,
    ActivityId
  })
}

async function update ({ id, ...data }) {
  const updateActivity = await Activity.findByPk(id)

  if (!updateActivity) {
    throw new Error('Not exist this activity!')
  }

  try {
    await updateActivity.update(data)
  } catch (error) {
    throw new Error('Update activity failed!')
  }

  return updateActivity
}

module.exports = {
  findAll,
  findOne,
  create,
  remove,
  removeCountry,
  addCountry,
  update
}
