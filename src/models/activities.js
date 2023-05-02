const { Model, DataTypes } = require('sequelize')

const ActivityModel = (sequelize) => {
  class Activity extends Model {}
  Activity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      season: {
        type: DataTypes.ENUM,
        values: ['spring', 'summer', 'fall', 'winter'],
        allowNull: false
      }
    },
    { sequelize, modelName: 'Activity' }
  )
}

module.exports = ActivityModel
