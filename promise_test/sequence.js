const {Deffered} = require('./chaining_promise')
const fs = require('fs')

const readFile = function (file, encoding) {
  let deffered = new Deffered()
  fs.readFile(file, encoding, deffered.callback())
  return deffered.promise
}

readFile('./origin1', 'utf-8').then((data) => {
  console.log(`file1: ${data}`)
  return readFile('./origin2', 'utf-8')
}).then((data) => {
  console.log(`file2: ${data}`)
}).then((data) => {
  console.log(`always file2: ${data}`)
}).then((data) => {
  console.log(`always file2: ${data}`)
})
