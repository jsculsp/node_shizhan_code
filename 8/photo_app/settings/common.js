const path = require('path')

module.exports = function (app) {
    app.set('views', path.join(__dirname, '..', 'views'))
    app.set('view engine', 'ejs')
    app.set('photos', path.join(__dirname, '..', '/public/photos'))
    app.set('root', path.join(__dirname, '..'))
}