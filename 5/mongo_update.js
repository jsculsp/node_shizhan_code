const mongodb = require('mongodb')
const server = new mongodb.Server('127.0.0.1', 27017, {})
const client = new mongodb.Db('mydatabase', server, {w: 1})

client.open(function (err) {
    if (err) throw err
    client.collection('test_insert', function (err, collection) {
        if (err) throw err

        let _id = new mongodb.ObjectID('59ddde74993daa2c846104d6')
        collection.update(
            {_id: _id},
            {$set: {"title": "I ate too much cake"}},
            {safe: true},
            function (err) {
                if (err) throw err
            }
        )
    })
})
