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

const server = connect()
server.use(router(routes))
server.listen(3000)
