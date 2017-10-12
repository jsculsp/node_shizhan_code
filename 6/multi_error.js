let connect = require('connect')

function hello(req, res, next) {
    if (req.url.match(/^\/hello/)) {
        res.end('Hello World\n')
    } else {
        next()
    }
}

let db = {
    users: {
        tobi: {name: 'tobi'},
        loki: {name: 'loki'},
        jane: {name: 'jane'}
    }
}

function users(req, res, next) {
    let match = req.url.match(/^\/user\/(.+?)\//)
    if (match) {
        console.log(match)
        let user = db.users[match[1]]
        if (user) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(user))
        } else {
            let err = new Error('User not found')
            err.notFound = true
            next(err)
        }
    } else {
        next()
    }
}

function pets(req, res, next) {
    if (req.url.match(/^\/pet\/(.+)/)) {
        foo()
    } else {
        next()
    }
}

function errorHandler(err, req, res, next) {
    console.error(err.stack)
    res.setHeader('Content-Type', 'application/json')
    if (err.notFound) {
        res.statusCode = 404
        res.end(JSON.stringify({error: err.message}))
    } else {
        res.statusCode = 500
        res.end(JSON.stringify({error: 'Internal Server Error'}))
    }
}

const app = connect()
app.use(users)
app.use(pets)
app.use(errorHandler)
app.use(hello)
app.listen(3000)
