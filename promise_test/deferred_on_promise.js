// 用 es6 的 Promise 实现 Deferred

class Deferred {
  constructor() {
    this.promise = new Promise(function (resolve, reject) {
      this._resolve = resolve
      this._reject = reject
    }.bind(this))
  }

  resolve = function (value) {
    this._resolve.call(this.promise, value)
  }

  reject = function (reason) {
    this._reject.call(this.promise, reason)
  }
}


exports.Deferred = Deferred