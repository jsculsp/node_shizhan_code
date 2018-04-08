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
    this._handlers.forEach(this._handle.bind(this))
    this._handlers = null
  }

  _reject(err) {
    this._state = REJECTED
    this._value = err
    this._handlers.forEach(this._handle.bind(this))
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
      let then = this._getThen(result)
      if (then) {
        this._doResolve(then.bind(result), this._resolve, this._reject)
        return
      }
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
        onFulfilled.call(this, value)
      }, (err) => {
        if (done) return
        done = true
        onRejected.call(this, err)
      })
    } catch (err) {
      if (done) return
      done = true
      onRejected.call(this, err)
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

  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      this.done(result => {
        if (typeof onFulfilled === 'function') {
          try {
            resolve(onFulfilled(result))
          } catch (ex) {
            reject(ex)
          }
        } else {
          resolve(result)
        }
      }, error => {
        if (typeof onRejected === 'function') {
          try {
            resolve(onRejected(error))
          } catch (ex) {
            reject(ex)
          }
        } else {
          reject(error)
        }
      })
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
}

// let p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(new Promise((resolve, reject) => {
//       setTimeout(() => resolve('inner...'), 100)
//     }))
//   }, 200)
// })
//
// p.then(() => console.log('first then of p...'))
//
// p.then(data => {
//   console.log(data)
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('then 1...')
//     }, 200)
//   })
// })
//   .then(data => console.log(data))
//
// p.then(() => console.log('third then of p...'))

let p2 = new Promise((resolve, reject) => {
  reject(new Error('错误！！！'))
})

p2.then(data => console.log('data: ', data), err => {console.log('err in then: ', err.toString()); throw err})
  .catch(err => console.log('err in catch: ', err.toString()))
