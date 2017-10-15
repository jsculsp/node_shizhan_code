const express = require('express')
const router = express.Router()
const Photo = require('../models/Photos')

const list = (req, res, next) => {
    Photo.find({}, (err, photos) => {
        if (err) return next(err)
        res.render('photos', {
            title: 'Photos',
            photos: photos,
        })
    })
}



router.get('/', list)

module.exports = router