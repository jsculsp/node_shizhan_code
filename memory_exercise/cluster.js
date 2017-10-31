const cluster = require('cluster')
const cpus = require('os').cpus()

cluster.setupMaster({
  exec: 'practise.js'
})

for (let i = 0; i < cpus.length; i++) {
  cluster.fork()
}