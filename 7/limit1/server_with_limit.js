const connect = require('connect')
const getRawBody = require('raw-body')
const bodyParser = require('body-parser')

const app = connect()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use((req, res) => {
    getRawBody(req, {
        limit: 20,
    }, (err, string) => {
        if (err) {
            res.end('too long...')
        } else {
            console.log('hello world!')
            res.end('How are you?')
        }
    })
})
app.listen(3000)
