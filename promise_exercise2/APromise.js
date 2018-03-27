let PENDING = 0
let FULFILLED = 1
let REJECTED = 2

class Promise {

  constructor(fn) {
    // store _state which can be PENDING, FULFILLED or REJECTED
    this._state = PENDING
    // store value once FULFILLED or REJECTED
    this.value = null
    // store sucess & failure _handlers
    this._handlers = []
    this._doResolve(fn, this.resolve, this._reject)
  }

  _fulfill(result) {
    this._state = FULFILLED
    this.value = result
    this._handlers.forEach(handle)
    this._handlers = null
  }

  _reject(error) {
    this._state = REJECTED
    this.value = error
    this._handlers.forEach(handle)
    this._handlers = null
  }

  /**
   * Check if a value is a Promise and, if it is,
   * return the `then` method of that promise.
   */
  static _getThen(value) {
    let t = typeof value
    if (value && (t === 'object' || t === 'function')) {
      let then = value.then
      if (typeof then === 'function') {
        return then
      }
    }
    return null
  }

  resolve(result) {
    try {
      let then = this._getThen(result)
      if (then) {
        this._doResolve(then.bind(result), this._resolve, this._reject)
        return
      }
      this._fulfill(result)
    } catch (e) {
      this._reject(e)
    }
  }

  handle(handler) {
    if (state === PENDING) {
      this._handlers.push(handler)
    } else {
      if (state === FULFILLED &&
        typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(this._value)
      }
      if (state === REJECTED &&
        typeof handler.onRejected === 'function') {
        handler.onRejected(this._value)
      }
    }
  }

  _doResolve(fn, onFulfilled, onRejected) {
    let done = false
    try {
      fn(function (value) {
        if (done) return
        done = true
        onFulfilled(value)
      }, function (reason) {
        if (done) return
        done = true
        onRejected(reason)
      })
    } catch (ex) {
      if (done) return
      done = true
      onRejected(ex)
    }
  }

  done(onFulfilled, onRejected) {
    // ensure we are always asynchronous
    setTimeout(function () {
      handle({
        onFulfilled: onFulfilled,
        onRejected: onRejected
      })
    })
  }

  then(onFulfilled, onRejected) {
    let self = this
    return new Promise(function (resolve, reject) {
      return self.done(function (result) {
        if (typeof onFulfilled === 'function') {
          try {
            return resolve(onFulfilled(result))
          } catch (ex) {
            return reject(ex)
          }
        } else {
          return resolve(result)
        }
      }, function (error) {
        if (typeof onRejected === 'function') {
          try {
            return resolve(onRejected(error))
          } catch (ex) {
            return reject(ex)
          }
        } else {
          return reject(error)
        }
      })
    })
  }
}
