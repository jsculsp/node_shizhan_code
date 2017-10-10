const events = require('events')
const fs = require('fs')
const log = console.log.bind(console)
const watchDir = './watch'
const processedDir = './done'

class Watcher extends events.EventEmitter {
    constructor(watchDir, processedDir) {
        super()
        this.watchDir = watchDir
        this.processedDir = processedDir
    }

    watch() {
        fs.readdir(this.watchDir, (err, files) => {
            if (err) {
                throw err
            }
            for (let file of files) {
                this.emit('process', file)
            }
        })
    }

    start() {
        log(`start to watch directory ${watchDir}...`)
        fs.watchFile(watchDir, () => {
            this.watch()
        })
    }
}

let watcher = new Watcher(watchDir, processedDir)

watcher.on('process', function (file) {
    let watchFile = this.watchDir + '/' + file
    let processedFile = this.processedDir + '/' + file.toLowerCase()

    fs.copyFile(watchFile, processedFile, (err) => {
        if (err) throw err
        log(`${watchFile} was copied to ${processedFile}`)
    })
})

watcher.start()
