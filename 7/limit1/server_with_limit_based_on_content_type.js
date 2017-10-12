const connect = require('connect')
const bodyParser = require('body-parser')


const type = function (type, fn) {
    return function (req, res, next) {
        let ct = req.headers['content-type'] || ''
        if (ct.indexOf(type) !== 0) {
            return next()
        }
        fn(req, res, next)
    }
}

let app = connect()
app.use(bodyParser.json({limit: '32kb'}))
app.use(bodyParser.urlencoded({limit: '64kb'}))

app.listen(3000)
