class TimeoutError extends Error {}

function delayPromise(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms)
  })
}

function timeoutPromise(promise, ms) {
  var timeout = delayPromise(ms).then(function () {
    return Promise.reject(new TimeoutError('timeout'))
  })
  return Promise.race([promise, timeout])
}

// 运行示例
var taskPromise = new Promise(function (resolve) {
  var delay = Math.random() * 2000
  setTimeout(function () {
    resolve(delay + "ms")
  }, delay)
})

timeoutPromise(taskPromise, 1000).then(function (value) {
  console.log("taskPromise在规定时间内结束 : " + value)
}).catch(function (error) {
  console.log("发生超时", error)
})