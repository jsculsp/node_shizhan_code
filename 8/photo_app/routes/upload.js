const path = require('path')
const fs = require('fs')
const express = require('express')
const multer = require('multer')
const app = require('../app')
const Photo = require('../models/Photos')

const router = express.Router()
const upload = multer({dest: app.get('photos')})

const form = (req, res) => {
    res.render('photos/upload', {
        title: 'Photo upload',
    })
}

const submit = (dir) => {
    return (req, res, next) => {
        let img = req.file
        let name = req.body.name || img.name
        let newPath = path.join(dir, img.originalname)
        fs.rename(img.path, newPath, (err) => {
            if (err) return next(err)
            Photo.create({
                name: name,
                path: newPath,
            }, (err) => {
                if (err) return next(err)
                res.redirect('/')
            })
        })
    }
}

router.get('/', form)
router.post('/', upload.single('image'), submit(app.get('photos')))

module.exports = router