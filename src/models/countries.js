const { Model, DataTypes } = require('sequelize')

const CountriesModel = (sequelize) => {
  class Country extends Model {}
  Country.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: false
      },
      capital: {
        type: DataTypes.STRING
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false
      },
      subregion: {
        type: DataTypes.STRING
      },
      area: { type: DataTypes.DECIMAL, allowNull: false },
      population: { type: DataTypes.DECIMAL, allowNull: false }
    },
    { sequelize, modelName: 'Country' }
  )
}

module.exports = CountriesModel
