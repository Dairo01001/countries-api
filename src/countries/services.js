const { Op } = require('sequelize')
const { Country, Activity } = require('../db')

async function findAll () {
  return await Country.findAll({})
}

async function findOne (id) {
  return await Country.findByPk(id, {
    include: [{ model: Activity, required: false }]
  })
}

async function findByName (name) {
  return await Country.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`
      }
    }
  })
}

module.exports = {
  findAll,
  findOne,
  findByName
}
