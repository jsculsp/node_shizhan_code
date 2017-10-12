const connect = require('connect')
const log = console.log.bind(console)

const logger = function (req, res, next) {
    log('%s %s', req.method, req.url)
    log(req.headers.host)
    next()
}

const hello = function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello world')
}

const app = connect()
app.use(logger)
app.use(hello)
app.listen(3000)
