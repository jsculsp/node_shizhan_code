const connect = require('connect')

function badMiddleware(req, res, next) {
    next(new Error('Bad middleware makes error'))
}

function errorHandler() {
    let env = process.env.NODE_ENV || 'development'
    return function (err, req, res, next) {
        res.statusCode = 500
        switch (env) {
            case 'development':
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(err))
                break
            default:
                res.end('Server error')
        }
    }
}

const app = connect()
app.use(badMiddleware)
app.use(errorHandler)
app.listen(3000)
