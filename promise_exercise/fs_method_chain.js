"use strict"
const fs = require("fs")

class File {
  constructor() {
    this.lastValue = null
  }

  static read(filePath) {
    let file = new File()
    return file.read(filePath)
  }

  read(filePath) {
    this.lastValue = fs.readFileSync(filePath, "utf-8")
    return this
  }

  transform(fn) {
    this.lastValue = fn.call(this, this.lastValue)
    return this
  }

  write(filePath) {
    this.lastValue = fs.writeFileSync(filePath, this.lastValue)
    return this
  }
}

module.exports = File