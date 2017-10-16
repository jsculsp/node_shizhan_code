const express = require('express')
const res = express.response

res.message = function (msg, type='info') {
  let session = this.req.session
  session.messages = session.messages || []
  session.messages.push({type: type, string: msg})
}

res.error = function (msg) {
  return this.message(msg, 'error')
}

module.exports = () => {
  return (req, res, next) => {
    res.locals.messages = req.session.messages || []
    res.locals.removeMessages = () => {
      req.session.messages = []
    }
    next()
  }
}
