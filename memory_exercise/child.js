const http = require('http')

const server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-type': 'text/plain'})
  res.end(`handled by child, pid is ${process.pid}\n`)
})

process.on('message', function (m, tcp) {
  if (m === 'server') {
    tcp.on('connection', function (socket) {
      server.emit('connection', socket)
    })
  }
})