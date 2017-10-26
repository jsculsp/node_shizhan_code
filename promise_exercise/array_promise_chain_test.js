"use strict"

let assert = require("assert")
let ArrayAsPromise = require("./array_promise_chain")

describe("array-promise-chain", function () {
  function isEven(value) {
    return value % 2 === 0
  }

  function double(value) {
    return value * 2
  }

  beforeEach(function () {
    this.array = [1, 2, 3, 4, 5]
  })

  describe("Native array", function () {
    it("can method chain", function () {
      let result = this.array.filter(isEven).map(double)
      assert.deepEqual(result, [4, 8])
    })
  })

  describe("ArrayAsPromise", function () {
    it("can promise chain", function () {
      let array = new ArrayAsPromise(this.array)
      return array.filter(isEven).map(double).then(function (value) {
        assert.deepEqual(value, [4, 8])
      })
    })
  })
})