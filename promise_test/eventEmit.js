const events = require('events')
const fs = require('fs')
const EventEmitter = events.EventEmitter
const log = console.log.bind(console)

const after = function (times, callback) {
  let count = 0
  let results = {}
  return (key, value) => {
    results[key] = value
    count++
    if (count === times) {
      callback(results)
    }
  }
}

const writeFile = function (results) {
  let {data1, data2} = results
  let data = data1.toString() + data2.toString()
  fs.writeFile('./destination', data, (err) => {
    if (err) {
      log(err)
    } else {
      log('写入成功！！！')
    }
  })
}

let done = after(2, writeFile)
let emitter = new EventEmitter()
emitter.on('done', done)

fs.readFile('./origin1', (err, data) => {
  emitter.emit('done', 'data1', data)
})

fs.readFile('./origin2', (err, data) => {
  emitter.emit('done', 'data2', data)
})
