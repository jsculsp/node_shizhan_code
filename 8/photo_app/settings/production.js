const settings = require('./common')

module.exports = function (app) {
    settings(app)
    app.set('photos', '/mounted-volumn/photos')
}