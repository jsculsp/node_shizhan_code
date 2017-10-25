const events = require('events')
const EventEmitter = events.EventEmitter
const log = console.log.bind(console)

class Promise extends EventEmitter {
  constructor() {
    super()
  }

  then(fullfilledHandler, errorHandler, progressHandler) {
    if (typeof fullfilledHandler === 'function') {
      this.once('success', fullfilledHandler)
    }
    if (typeof errorHandler === 'function') {
      this.once('error', errorHandler)
    }
    if (typeof progressHandler === 'function') {
      this.on('progress', progressHandler)
    }
    return this
  }
}

class Deffered {
  constructor() {
    this.state = 'unfulfilled'
    this.promise = new Promise()
  }

  resolve(obj) {
    this.state = 'fulfilled'
    this.promise.emit('success', obj)
  }

  reject(err) {
    this.state = 'failed'
    this.promise.emit('error', err)
  }

  progress(data) {
    this.promise.emit('progress', data)
  }
}

exports.Deffered = Deffered