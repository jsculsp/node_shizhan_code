const http = require('http')

const server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-type': 'text/plain'})
  res.end(`handled by child, pid is ${process.pid}\n`)
})

let worker
process.on('message', function (m, tcp) {
  worker = tcp
  if (m === 'server') {
    worker.on('connection', function (socket) {
      server.emit('connection', socket)
    })
  }
})

process.on('uncaughtException', function () {
  // 记录日志（需要实现 logger）
  // logger.error(err)
  // 发送自杀信号
  process.send({act: 'suicide'})
  // 停止接收新的连接
  worker.close(function () {
    // 所有已有连接断开后，退出进程
    process.exit(1)
  })
  // 设置超时时间，5秒后退出进程
  setTimeout(function () {
    process.exit(1)
  }, 5000)
})