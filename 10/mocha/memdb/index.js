let db = []

const clear = function () {
  db = []
}

const save = function (doc, cb) {
  db.push(doc)
  if (cb) {
    setTimeout(function () {
      cb()
    }, 1000)
  }
}

const first = function (obj) {
  return db.filter(function (doc) {
    for (let key in obj) {
      if (doc[key] != obj[key]) {
        return false
      }
    }
    return true
  }).shift()
}

module.exports = {
  clear,
  save,
  first,
}

