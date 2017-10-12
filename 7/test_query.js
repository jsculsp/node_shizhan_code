const connect = require('connect')
const query = require('./middleware/query')

const app = connect()
app.use(query())
app.use((req, res, next) => {
    res.setHeader('Content-typ', 'application/json')
    res.end(JSON.stringify(req.query))
})
app.listen(3000)