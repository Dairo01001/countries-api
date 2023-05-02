const { Op } = require('sequelize')
const { Country, Activity } = require('../db')

async function findAll () {
  return await Country.findAll({
    attributes: ['id', 'name', 'flag', 'region']
  })
}

async function findOne (id) {
  return await Country.findByPk(id, {
    include: [
      {
        model: Activity,
        required: false,
        attributes: ['id', 'name', 'difficulty', 'duration', 'season']
      }
    ],
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
  })
}

async function findByName (name) {
  return await Country.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`
      }
    },
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
  })
}

module.exports = {
  findAll,
  findOne,
  findByName
}
