const redis = require('redis')
const db = redis.createClient()

class Entry {
  constructor(obj) {
    Object.assign(this, obj)
  }

  save(fn) {
    let entryJSON = JSON.stringify(this)
    db.lpush('entries', entryJSON, (err) => {
      if (err) return fn(err)
      fn()
      }
    )
  }

  static getRange(from, to, fn) {
    db.lrange('entries', from, to, (err, items) => {
      if (err) return fn(err)
      let entries = []

      items.forEach((item) => {
        entries.push(JSON.parse(item))
      })
      fn(null, entries)
    })
  }

  static count(fn) {
    db.llen('entries', fn)
  }
}

module.exports = Entry