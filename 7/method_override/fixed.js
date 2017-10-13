const connect = require('connect')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

function edit(req, res, next) {
    if (req.method !== 'GET') return next()
    res.setHeader('Content-Type', 'text/html')
    res.write('<form method="post">')
    res.write('<input type="hidden" name="_method" value="put" />')
    res.write('<input type="text" name="user[name]" value="Tobi" />')
    res.write('<input type="submit" value="Update" />')
    res.write('</form>')
    res.end()
}

function update(req, res, next) {
    if (req.method !== 'PUT') return next()
    res.end('Updated name to ' + req.body.user.name)
}

const app = connect()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(methodOverride())
app.use(edit)
app.use(update)
app.listen(3000)
