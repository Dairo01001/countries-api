const { connection, Country } = require('./index')
const countries = require('../mocks/countries.json')

connection.sync({ force: true }).then(() => {
  Country.bulkCreate(
    countries.map(
      ({
        area,
        population,
        subregion,
        name,
        cca2,
        flags,
        capital,
        region
      }) => ({
        id: cca2,
        name: name.common,
        flag: flags.find((url) => url.endsWith('.svg')),
        capital: capital ? capital.join() : '',
        region,
        subregion: subregion || '',
        area,
        population
      })
    )
  )
})
