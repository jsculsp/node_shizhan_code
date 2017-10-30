const log = console.log.bind(console)

const showMem = function () {
  let mem = process.memoryUsage()
  let format = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`
  log(`Process: heapTotal ${format(mem.heapTotal)} heapUsed ${format(mem.heapUsed)} rss ${format(mem.rss)}`)
  log(`----------------------------------------------------------------`)
}

const useMem = function () {
  let size = 20 * 1024 * 1024
  let array = new Array(size)
  for (let i = 0; i < size; i++) {
    array[i] = 0
  }
  return array
}

let total = []

for (let i = 0; i < 15; i++) {
  showMem()
  total.push(useMem())
}

showMem()