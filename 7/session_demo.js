const connect = require('connect')
const url = require('url')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const errorhandler = require('errorhandler')

const app = connect()
const hour = 3600000

app.use(session({
    store: new RedisStore({prefix: 'sid'}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: hour * 24,
    }
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
    let s = req.session
    let view = s.views[pathname]
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    if (pathname !== '/errorhandler') {
        res.end(`
            <p>you viewed this page ${(view || 0)} times</p>
            <p>expires in: ${Math.floor(s.cookie.maxAge / 1000)}s</p>
            <p>httpOnly: ${s.cookie.httpOnly}</p>
            <p>path: ${s.cookie.path}</p>
            <p>domain: ${s.cookie.domain}</p>
            <p>secure: ${s.cookie.secure}</p>
        `)
    } else {
        next(Error('something broke!'))
    }
})

app.use(errorhandler())

app.listen(3000)