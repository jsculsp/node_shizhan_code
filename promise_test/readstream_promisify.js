const fs = require('fs')
const {Deffered} = require('./promise')
const readStream = fs.createReadStream('./destination')
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

promisify(readStream).then((result) => {
  log(`result: ${result}`)
}, (err) => {
  log(`error: ${err}`)
}, (data) => {
  log(`data: ${data}`)
})