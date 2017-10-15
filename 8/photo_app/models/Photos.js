const mongooes = require('mongoose')
mongooes.connect('mongodb://localhost/photo_app')

const schema = new mongooes.Schema({
    name: String,
    path: String,
})

module.exports = mongooes.model('Photo', schema)
