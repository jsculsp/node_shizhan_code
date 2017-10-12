const url = require('url')
const qs = require('qs')

module.exports = function () {
    return (req, res, next) => {
        let queryString = url.parse(req.url).query
        let obj = qs.parse(queryString)
        req.query = obj
        next()
    }
}