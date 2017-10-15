const express = require('express')
const router = express.Router()

const form = (req, res) => {
    res.render('photos/upload', {
        title: 'Photo upload',
    })
}

const submit = (req, res) => {

}

router.get('/', form)
router.post('/', submit)

module.exports = router