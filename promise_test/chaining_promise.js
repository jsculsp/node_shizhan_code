const events = require('events')
const EventEmitter = events.EventEmitter
const log = console.log.bind(console)

class Deffered {
  constructor() {
    this.promise = new Promise()
  }

  resolve(obj) {
    let promise = this.promise
    let handler
    while (handler = promise.queue.shift()) {
      if (handler && handler.fulfilled) {
        
      }
    }
  }
}

class Promise {
  constructor() {
    this.queue = []
    this.isPromise = true
  }

  then(fulfilledHandler, errorHandler, progressHandler) {
    let handler = {}
    if (typeof fulfilledHandler === 'function') {
      handler.fulfilled = fulfilledHandler
    }
    if (typeof errorHandler === 'function') {
      handler.error = errorHandler
    }
    if (typeof progressHandler === 'function') {
      handler.progress = progressHandler
    }
    this.queue.push(handler)
    return this
  }
}