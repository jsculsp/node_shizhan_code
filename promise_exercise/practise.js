const EventEmitter = require('events').EventEmitter

let emitter = new EventEmitter()

emitter.once('push', (data) => {console.log(data)})

emitter.emit('push', '呵呵1！')

emitter.once('push', (data) => {console.log(data)})

emitter.emit('push', '呵呵2！')

emitter.once('push', (data) => {console.log(data)})

emitter.emit('push', '呵呵3！')

emitter.once('push', (data) => {console.log(data)})

emitter.emit('push', '呵呵4！')