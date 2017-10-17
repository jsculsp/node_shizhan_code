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
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})