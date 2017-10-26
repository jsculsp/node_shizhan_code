"use strict"
const fs = require("fs")

class File {
  constructor() {
    this.promise = Promise.resolve()
  }
  
  static read(filePath) {
    let file = new File()
    return file.read(filePath)
  }
  
  then(onFulfilled, onRejected) {
    this.promise = this.promise.then(onFulfilled, onRejected)
    return this
  }
  
  catch(onRejected) {
    this.promise = this.promise.catch(onRejected)
    return this
  }
  
  read(filePath) {
    return this.then(function () {
      return fs.readFileSync(filePath, "utf-8")
    })
  }
  
  transform(fn) {
    return this.then(fn)
  }
  
  write(filePath) {
    return this.then(function (data) {
      return fs.writeFileSync(filePath, data)
    })
  }
}

module.exports = File