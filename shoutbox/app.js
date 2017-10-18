const express = require('express')

// view engine setup
const app = express()
module.exports = app
require('./settings/common')(app)

app.use('/', require('./routes/index'))
app.use('/register', require('./routes/register'))
app.use('/api', require('./routes/api'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).format({
    html: () => {
      res.render('404')
    },
    json: () => {
      res.send({message: 'Resource not found'})
    },
    xml: () => {
      res.send(`
        <error>
          <message>Resource not found</message>
        </error>
      `)
    },
    text: () => {
      res.send('Resource not found\n')
    }
  })
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  if (req.app.get('env') === 'development') {
    res.locals.message = err.message
    res.locals.error = err
    res.status(err.status || 500)
    res.render('error')
  } else {
    console.error(err.stack)
    let msg
    switch (err.type) {
      case 'database':
        msg = 'Server Unavailable'
        res.statusCode = 503
        break

    default:
      msg = 'Internal Server Error'
      res.statusCode = 500
    }

    res.format({
      html: () => {
        res.render('5xx', {msg: msg, status: res.statusCode})
      },
      json: () => {
        res.send({error: msg})
      },
      text: () => {
        res.send(`${msg}\n`)
      }
    })
  }
})