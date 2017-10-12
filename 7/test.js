const connect = require('connect')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const favicon = require('serve-favicon')

// 使用这段代码前注释掉其它代码
// const app = connect()
// app.use(cookieParser('tobi is a cool ferret'))
// app.use((req, res) => {
//     console.log(req.cookies)
//     console.log(req.signedCookies)
//     res.end('hello\n')
// })
// app.listen(3000)

// 使用这段代码前注释掉其它代码
const app = connect()
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('combined'))
app.use((req, res) => {
    // ...注册用户...
    res.end('Registered new user: ' + req.body.username)
})
app.listen(3000)
