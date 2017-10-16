const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const messages = require('../lib/messages')

module.exports = function (app) {
  app.set('views', path.join(__dirname, '..', 'views'))
  app.set('view engine', 'ejs')
  app.set('root', path.join(__dirname, '..'))

  const hour = 3600000

  app.use(session({
    store: new RedisStore({prefix: 'sid'}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: hour * 24,
    }
  }))

  app.use(messages())
  app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')))
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(cookieParser())
  app.use('/public', express.static(path.join(__dirname, '..', 'public')))
}