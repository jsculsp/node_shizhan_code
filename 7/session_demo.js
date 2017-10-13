const connect = require('connect')
const url = require('url')
const session = require('express-session')

const app = connect()

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(function (req, res, next) {
    if (!req.session.views) {
        req.session.views = {}
    }

    // get the url pathname
    let pathname = url.parse(req.url).pathname

    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

    next()
})

app.use(function (req, res, next) {
    let pathname = url.parse(req.url).pathname
    res.end('you viewed this page ' + (req.session.views[pathname] || 0) + ' times')
})

app.listen(3000)