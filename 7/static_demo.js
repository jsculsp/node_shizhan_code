const serveStatic = require('serve-static')
const connect = require('connect')
const serveIndex = require('serve-index')

const app = connect()
app.use('/limit1', serveIndex('limit1', {'icons': true}))
app.use('/limit1', serveStatic('limit1'))
app.listen(3000)