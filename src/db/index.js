const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('../config')
const initModels = require('../models')

const sequelize = new Sequelize(DATABASE_URL, {})

const authenticate = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

authenticate()
initModels(sequelize)

const { Country, Activity } = sequelize.models

Country.belongsToMany(Activity, { through: 'CountryActivity' })
Activity.belongsToMany(Country, { through: 'CountryActivity' })

const { CountryActivity } = sequelize.models

module.exports = {
  Country,
  Activity,
  CountryActivity,
  connection: sequelize
}
