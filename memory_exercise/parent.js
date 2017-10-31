const cp = require('child_process')
const server = require('net').createServer()

let child1 = cp.fork('child.js')
let child2 = cp.fork('child.js')

server.listen(3000, function () {
  child1.send('server', server)
  child2.send('server', server)
  server.close()
})