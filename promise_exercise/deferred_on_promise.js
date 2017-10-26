// 用 es6 的 Promise 实现 Deferred

class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  resolve(value) {
    this._resolve.call(this.promise, value)
  }

  reject(reason) {
    this._reject.call(this.promise, reason)
  }
}

exports.Deferred = Deferred
