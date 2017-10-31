const cp = require('child_process')
const n = cp.fork(__dirname + '/child.js')

n.on('message', function (m) {
  console.log('PARENT got message:', m)
})

n.send({hello: 'world'})