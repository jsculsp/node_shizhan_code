const {Deferred} = require('deferred_on_promise')

function getURL(URL) {
  var deferred = new Deferred()
  var req = new XMLHttpRequest()
  req.open('GET', URL, true)
  req.onload = function () {
    if (req.status === 200) {
      deferred.resolve(req.responseText)
    } else {
      deferred.reject(new Error(req.statusText))
    }
  }
  req.onerror = function () {
    deferred.reject(new Error(req.statusText))
  }
  req.send()
  return deferred.promise
}

// 运行示例
var URL = 'http://3d.fuwo.com/measure/open/config/'
getURL(URL).then(function onFulfilled(value) {
  console.log(value)
}).catch(console.error.bind(console))