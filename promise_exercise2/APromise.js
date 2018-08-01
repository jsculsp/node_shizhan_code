const PENDING = Symbol('PENDING')
const FULFILLED = Symbol('FULFILLED')
const REJECTED = Symbol('REJECTED')

class Promise {
  constructor(fn) {
    this._state = PENDING
    this._value = null
    this._handlers = []
    // fn 函数接收两个回调函数作为参数，即 onFulfilled 和 onRejected，这里我们的实现是 this._resolve 和 this._reject
    // 调 this._doResolve 包一层的原因见 this._doResolve 方法
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

  /**
   *
   * @param fn A resolver function that may not be trusted
   * @param onFulfilled
   * @param onRejected
   * @private
   */
  _doResolve(fn, onFulfilled, onRejected) {
    let done = false
    try {
      // 保证 onFulfilled 和 onRejected 只会被调用一次
      // 可能 fn 直接调用 reject，也可能 fn 函数出错，这时候都需要调用 onRejected 回调函数
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

// reject 或 resolve 后必须 return，否则之后的逻辑还会执行，可能会产生意想不到的后果
let p = new Promise((resolve, reject) => {
  reject(new Error('先主动抛出！'))
  resolve('这是正常的响应')
  throw new Error('意外的错误！')
})

p
  .then(data => console.log('数据: ', data))
  .catch(err => console.log('接住: ', err.toString()))
