class Deffered {
  constructor() {
    this.promise = new Promise()
  }

  resolve(obj) {
    let promise = this.promise
    let handler
    while (handler = promise.queue.shift()) {
      if (handler && handler.fulfilled) {
        let ret = handler.fulfilled(obj)
        if (ret && ret.isPromise) {
          ret.queue = promise.queue
          this.promise = ret
          return
        } else if (ret !== undefined) {
          obj = ret
        }
      }
    }
  }

  reject(err) {
    let promise = this.promise
    let handler
    while (handler = promise.queue.shift()) {
      if (handler && handler.error) {
        let ret = handler.error(err)
        if (ret && ret.isPromise) {
          ret.queue = promise.queue
          this.promise = ret
          return
        }
      }
    }
  }

  callback() {
    return (err, data) => {
      if (err) {
        return this.reject(err)
      }
      this.resolve(data)
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

module.exports = {Deffered, Promise}