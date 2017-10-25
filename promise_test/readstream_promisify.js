const fs = require('fs')
const {Promise, Deffered} = require('./promise')
const readStream1 = fs.createReadStream('./origin1')
const readStream2 = fs.createReadStream('./origin2')
const log = console.log.bind(console)

const promisify = function (readStream) {
  let rs = readStream
  rs.setEncoding('utf-8')
  let deferred = new Deffered()
  let result = ''

  rs.on('data', (chunk) => {
    result += chunk
    deferred.progress(chunk)
  })

  rs.on('end', () => {
    deferred.resolve(result)
  })

  rs.on('error', (err) => {
    deferred.reject(err)
  })

  return deferred.promise
}

let promise1 = promisify(readStream1)
let promise2 = promisify(readStream2)
let deffered = new Deffered()

const genFunc = function () {
  return [
    (result) => {
      log(`result: ${result}`)
    }, (err) => {
      log(`error: ${err}`)
    }, (data) => {
      log(`data: ${data}`)
    },
  ]
}

promise1.then(...genFunc())
promise2.then(...genFunc())

deffered.all([promise1, promise2]).then(() => {
  log('promise1 和 promise2 均已执行完毕！！！')
}, (err) => {
  log(err)
})