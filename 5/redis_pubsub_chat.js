const net = require('net')
const redis = require('redis')

const server = net.createServer()

server.on('connection', (socket) => {
    let subscriber = redis.createClient()   // 订阅者
    let publisher = redis.createClient()    // 发布者
    subscriber.subscribe('main_chat_room')

    subscriber.on('message', function (channel, message) {
        socket.write('Channel ' + channel + ': ' + message)
    })

    socket.on('data', function (data) {
        publisher.publish('main_chat_room', data)
    })

    socket.on('end', function () {
        subscriber.unsubscribe('main_chat_room')
        subscriber.end()
        publisher.end()
    })
})

server.listen(3000)
