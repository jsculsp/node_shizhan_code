const express = require('express')
const app = require('../app')
const Photo = require('../models/Photos')
const router = express.Router()

const index = (req, res) => {
    res.render('index', {title: 'Express'})
}

const download = (dir) => {
    return (req, res, next) => {
        let id = req.params.id
        Photo.findById(id, (err, photo) => {
            if (err) return next(err)
            res.download(photo.path, photo.name + '.png')
        })
    }
}

router.get('/', index)

router.get('/photo/:id/download', download(app.get('photos')))

module.exports = router
