const User = require('../user')

module.exports = (req, res, next) => {
  if (req.remoteUser) {
    req.user = res.locals.user = req.remoteUser
  }
  let uid = req.session.uid
  if (!uid) return next()
  User.get(uid, (err, user) => {
    if (err) return next(err)
    req.user = res.locals.user = user
    next()
  })
}