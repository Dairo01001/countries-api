const initModels = (sequelize) => {
  require('./countries')(sequelize)
  require('./activities')(sequelize)
}

module.exports = initModels
