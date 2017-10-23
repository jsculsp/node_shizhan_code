const net = require('net')

const socket = net.connect({host: 'localhost', port: 3000})
socket.setEncoding('utf-8')

socket.on('data', (chunk) => {
  console.log(chunk)
})

let count = 0

setInterval(() => {
  socket.write(`hello for the ${++count} time`)
}, 1000)