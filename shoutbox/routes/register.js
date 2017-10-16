const express = require('express')
const User = require('../lib/user')
const router = express.Router()

const form = (req, res) => {
  res.render('register', {title: 'Register'})
}

const submit = (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
  User.getByName(username, (err, user) => {
    if (err) return next(err)

    if (user.id) {
      res.error('Username already taken!')
      res.redirect('back')
    } else {
      user = new User({
        name: username,
        pass: password,
      })

      user.save((err) => {
        if (err) return next(err)
        req.session.uid = user.id
        res.redirect('/')
      })
    }
  })
}

router.get('/', form)
router.post('/', submit)

module.exports = router