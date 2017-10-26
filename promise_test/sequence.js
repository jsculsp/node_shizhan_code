const {Deffered} = require('./chaining_promise')
const fs = require('fs')
const log = console.log.bind(console)

const smooth = function (method) {
  return function () {
    let deffered = new Deffered()
    let args = Array.from(arguments)
    args.push(deffered.callback())
    setImmediate(method, ...args)
    // method.apply(null, args)
    return deffered.promise
  }
}

const readFile = smooth(fs.readFile)


// 用这种实现的 Promise 调用 then 方法返回的是同一个 promise 实例，
// 最新的 es6 Promise 每次调用 then 都会返回一个新的 promise 实例
readFile('./origin1', 'utf-8').then((data) => {
  log(`file1: ${data}`)
  return readFile('./origin2', 'utf-8')
}).then((data) => {
  log(`file2: ${data}`)
}).then((data) => {
  log(`always file2: ${data}`)
  return '这是第三条数据\r\n'
}).then((data) => {
  log(`not file2 anymore: ${data}`)
})

//
// let temp = function (v, cb) {
//   cb(null, v)
// }
//
// let func = smooth(temp)
//
// func(3).then((data) => {
//   log('data: ' + data)
// })