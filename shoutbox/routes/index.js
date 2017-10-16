const express = require('express')
const User = require('../lib/user')
const Entry = require('../lib/entry')
const validate = require('../lib/middleware/validate')
const page = require('../lib/middleware/page')
const router = express.Router()

const list = (req, res, next) => {
  let page = req.page
  Entry.getRange(page.from, page.to, (err, entries) => {
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

const entryForm = (req, res, next) => {
  res.render('post', {title: 'Post'})
}

const entrySubmit = (req, res, next) => {
  let entry = new Entry({
    username: res.locals.user.name,
    title: req.body.title,
    body: req.body.body,
  })

  entry.save((err) => {
    if (err) return next(err)
    res.redirect('/')
  })
}

router.get('/', page(Entry.count, 5), list)
router.get('/login', form)
router.post('/login', submit)
router.get('/logout', logout)
router.get('/post', entryForm)
router.post('/post', validate.required('title'), validate.lengthAbove('title', 4), entrySubmit)

module.exports = router
