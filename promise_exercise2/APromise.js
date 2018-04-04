const PENDING = Symbol('PENDING')
const FULFILLED = Symbol('FULFILLED')
const REJECTED = Symbol('REJECTED')

class Promise {
  constructor(fn) {
    this._state = PENDING
    this._value = null
    this._handlers = []
    this._doResolve(fn, this._resolve, this._reject)
  }

  _fulfill(request) {
    this._state = FULFILLED
    this._value = request
    this._handler.forEach(this._handle)
    this._handlers = null
  }

  _reject(err) {
    this._state = REJECTED
    this._value = err
    this._handlers.forEach(this._handle)
    this._handlers = null
  }

  _getThen(value) {
    let t = typeof value
    if (value && (t === 'object' || t === 'function')) {
      let then = value.then
      if (typeof then === 'function') {
        return then
      }
    }
    return null
  }

  _resolve(result) {
    try {
      // let then = this._getThen(result)
      // if (then) {
      //   this._doResolve(then.bind(result), this._resolve, this._reject)
      //   return
      // }
      this._fulfill(result)
    } catch (err) {
      this._reject(err)
    }
  }

  _handle(handler) {
    if (this._state === PENDING) {
      this._handlers.push(handler)
    } else {
      if (this._state === FULFILLED && typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(this._value)
      }
      if (this._state === REJECTED && typeof handler.onRejected === 'function') {
        handler.onRejected(this._value)
      }
    }
  }

  _doResolve(fn, onFulfilled, onRejected) {
    let done = false
    try {
      fn((value) => {
        if (done) return
        done = true
        onFulfilled(value)
      }, (err) => {
        if (done) return
        done = true
        onRejected(err)
      })
    } catch (err) {
      if (done) return
      done = true
      onRejected(err)
    }
  }

  done(onFulfilled, onRejected) {
    process.nextTick(() => {
      this._handle({
        onFulfilled: onFulfilled,
        onRejected: onRejected,
      })
    })
  }
}

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello')
  }, 100)
})

p.done(data => console.log(data), err => console.log(err))
