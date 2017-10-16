const express = require('express')
const User = require('../lib/user')
const Entry = require('../lib/entry')
const router = express.Router()

const list = (req, res, next) => {
  Entry.getRange(0, -1, (err, entries) => {
    if (err) return next(err)

    res.render('entries', {
      title: 'Entries',
      entries: entries,
    })
  })
}

const form = (req, res, next) => {
  res.render('login', {title: 'Login'})
}

const submit = (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
  User.authenticate(username, password, (err, user) => {
    if (err) next(err)
    if (user) {
      req.session.uid = user.id
      res.redirect('/')
    } else {
      res.error('Sorry! invalid credentials.')
      res.redirect('back')
    }
  })
}

const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) throw err
    res.redirect('/')
  })
}

router.get('/', list)
router.get('/login', form)
router.post('/login', submit)
router.get('/logout', logout)

module.exports = router
