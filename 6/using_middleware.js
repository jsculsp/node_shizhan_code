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

const server = connect()
server.use(logger)
server.use(hello)
server.listen(3000)
