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

// 运行实例
// 第二个参数是传给 `Notification` 的option对象
notifyMessage("Hi!", {}, function (error, notification) {
  if (error) {
    return console.error(error)
  }
  console.log(notification)// 通知对象
})