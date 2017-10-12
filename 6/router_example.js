const connect = require('connect')
const router = require('./middleware/router')
const routes = {
    GET: {
        '/users': function (req, res) {
            res.end('tobi, loki, ferret')
        },
        '/user/:id': function (req, res, id) {
            res.end('user ' + id)
        }
    },
    DELETE: {
        '/user/:id': function (req, res, id) {
            res.end('deleted user ' + id)
        }
    }
}

const app = connect()
app.use(router(routes))
app.listen(3000)
