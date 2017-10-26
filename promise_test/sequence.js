const {Deffered} = require('./chaining_promise')
const fs = require('fs')
const log = console.log.bind(console)

const smooth = function (method) {
  return function () {
    let deffered = new Deffered()
    let args = Array.from(arguments)
    args.push(deffered.callback())
    setTimeout(method, 0, ...args)
    // method.apply(null, args)
    return deffered.promise
  }
}

// const readFile = smooth(fs.readFile)
//
// readFile('./origin1', 'utf-8').then((data) => {
//   log(`file1: ${data}`)
//   return readFile('./origin2', 'utf-8')
// }).then((data) => {
//   log(`file2: ${data}`)
// }).then((data) => {
//   log(`always file2: ${data}`)
// }).then((data) => {
//   log(`always file2: ${data}`)
// })


let temp = function (v, cb) {
  cb(null, v)
}

let func = smooth(temp)

func(3).then((data) => {
  log('data: ' + data)
})