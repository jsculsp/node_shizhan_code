"use strict"

class ArrayAsPromise {
  constructor(array) {
    this.array = array
    this.promise = Promise.resolve()
  }

  then(onFulfilled, onRejected) {
    this.promise = this.promise.then(onFulfilled, onRejected)
    return this
  }
  
  catch(onRejected) {
    this.promise = this.promise.catch(onRejected)
    return this
  }
}

Object.getOwnPropertyNames(Array.prototype).forEach(function (methodName) {
  // Don't overwrite
  if (typeof ArrayAsPromise[methodName] !== "undefined") {
    return
  }
  let arrayMethod = Array.prototype[methodName]
  if (typeof  arrayMethod !== "function") {
    return
  }
  ArrayAsPromise.prototype[methodName] = function () {
    this.promise = this.promise.then(() => {
      this.array = this.array[methodName](...arguments)
      return this.array
    })
    return this
  }
})

module.exports = ArrayAsPromise
module.exports.array = function newArrayAsPromise(array) {
  return new ArrayAsPromise(array)
}

let a = new ArrayAsPromise([1, 2, 3])