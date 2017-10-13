/**
 * Module dependencies.
 */

const express = require('express')
const routes = require('./routes')
const user = require('./routes/user')
const http = require('http')
const path = require('path')
const photos = require('./routes/photos')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')

const app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(favicon())
app.use(morgan('dev'))
app.use(bodyParser())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

app.set('photos', __dirname + '/public/photos')

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler())
}

app.get('/users', user.list)
app.get('/', photos.list)
app.get('/upload', photos.form)
app.post('/upload', photos.submit(app.get('photos')))
app.get('/photo/:id/download', photos.download(app.get('photos')))


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'))
})
