function notifyMessage(message, options, callback) {
  if (Notification && Notification.permission === 'granted') {
    var notification = new Notification(message, options)
    callback(null, notification)
  } else if (Notification.requestPermission) {
    Notification.requestPermission(function (status) {
      if (Notification.permission !== status) {
        Notification.permission = status
      }
      if (status === 'granted') {
        var notification = new Notification(message, options)
        callback(null, notification)
      } else {
        callback(new Error('user denied'))
      }
    })
  } else {
    callback(new Error('doesn\'t support Notification API'))
  }
}

// 返回 `thenable`
function notifyMessageAsThenable(message, options) {
  return {
    'then': function (resolve, reject) {
      notifyMessage(message, options, function (error, notification) {
        if (error) {
          reject(error)
        } else {
          resolve(notification)
        }
      })
    }
  }
}

// 运行示例
Promise.resolve(notifyMessageAsThenable("message")).then(function (notification) {
  console.log(notification)// 通知对象
}).catch(function (error) {
  console.error(error)
})