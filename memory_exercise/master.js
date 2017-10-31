const fork = require('child_process').fork
const cpus = require('os').cpus()
const server = require('net').createServer()
server.listen(3000)

const workers = {}
const limit = 10
const during = 60000
let restart = []

const isTooFrequently = function () {
  let time = Date.now()
  let length = restart.push(time)
  if (length > limit) {
    restart = restart.slice(-limit)
  }
  return restart.length >= limit && restart[restart.length - 1] - restart[0] < during
}

const createWorker = function () {
  // 检查是否太过频繁
  if (isTooFrequently()) {
    process.emit('giveup', restart.length, during)
    return
  }
  let worker = fork(`${__dirname}/worker.js`)
  worker.on('message', function (message) {
    if (message.act === 'suicide') {
      createWorker()
    }
  })
  worker.on('exit', function () {
    console.log(`Worker ${worker.pid} exited.`)
    delete workers[worker.pid]
  })
  worker.send('server', server)
  workers[worker.pid] = worker
  console.log(`Create worker. pid: ${worker.pid}`)
}

for (let i = 0; i < cpus.length; i++) {
  createWorker()
}

process.on('exit', function () {
  for (let pid in workers) {
    workers[pid].kill()
  }
})

process.on('giveup', function (length, during) {
  // 在这个事件中添加重要日志，并让监控系统监视到这个严重错误，进而报警等。
})