let connect = require('connect')

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url)
    next()
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello world')
}

function authenticateWithDatabase(user, pass, callback) {
    let err
    if (user != 'tobi' || pass != 'ferret') {
        err = new Error('Unauthorized')
    }
    callback(err)
}

function restrict(req, res, next) {
    let authorization = req.headers.authorization
    if (!authorization) return next(new Error('Unauthorized'))

    let parts = authorization.split(' ')
    let auth = new Buffer(parts[1], 'base64').toString().split(':')
    let user = auth[0]
    let pass = auth[1]

    authenticateWithDatabase(user, pass, function (err) {
        if (err) return next(err)
        next()
    })
}

function admin(req, res, next) {
    switch (req.url) {
        case '/':
            res.end('try /users')
            break
        case '/users':
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(['tobi', 'loki', 'jane']))
            break
    }
}

const server = connect()
server.use(logger)
server.use('/admin', restrict)
server.use('/admin', admin)
server.use(hello)
server.listen(3000)
