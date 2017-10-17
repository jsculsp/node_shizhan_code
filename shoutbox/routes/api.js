const express = require('express')
const User = require('../lib/user')
const Entry = require('../lib/entry')
const page = require('../lib/middleware/page')
const router = express.Router()

const user = (req, res, next) => {
  User.get(req.params.id, (err, user) => {
    if (err) return next(err)
    if (!user.id) return res.send(404)
    res.send(user)
  })
}

const entries = (req, res, next) => {
  let page = req.page
  Entry.getRange(page.from, page.to, (err, entries) => {
    if (err) return next(err)

    res.format({
      json: () => {
        res.send(entries)
      },
      xml: () => {
        res.render('entries/xml', {entries: entries})
      }
    })
  })
}

const entrySubmit = (req, res, next) => {
  let entry = new Entry({
    username: res.locals.user,
    title: req.body.title,
    body: req.body.body,
  })

  entry.save((err) => {
    if (err) return next(err)
    if (req.auth) {
      res.send({message: 'Entry added.'})
    }
  })
}

router.get('/user/:id(\\d+)', user)
router.post('/entry', entrySubmit)
router.get('/entries/:page?', page(Entry.count, 5), entries)

module.exports = router