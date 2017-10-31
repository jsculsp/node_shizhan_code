const http = require('http')

const leakArray = []

const leak = function () {
  leakArray.push(`leak ${Math.random()}`)
}

const server = http.createServer(function (req, res) {
  leak()
  res.writeHead(200, {'Content-type': 'text/plain'})
  res.end('Hello World\n')
})

server.listen(3000)
console.log('Server running at http://127.0.0.1:3000/')