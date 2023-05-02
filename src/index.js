const { app } = require('./app')
const { connection } = require('./db')

connection.sync({ }).then(() => {
  app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en: http://localhost:${app.get('port')}`)
  })
})
