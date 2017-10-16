const basicAuth = require('express-basic-auth')
const User = require('../user')

module.exports = basicAuth({
  authorizer: User.authenticate,
  authorizeAsync: true,
})