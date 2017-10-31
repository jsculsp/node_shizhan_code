const http = require('http')

const server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World\n')
})

let port = Math.round(1000 + Math.random() * 1000)
server.listen(port, '0.0.0.0')
console.log('listening at: ' + port)