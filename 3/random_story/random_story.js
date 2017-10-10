const fs = require('fs')
const request = require('request')
const htmlparser = require('htmlparser')
const log = console.log.bind(console)
const configFilename = './rss_feeds.txt'

const checkForRSSFile = function () {
    fs.exists(configFilename, (exists) => {
        if (!exists) {
            return next(new Error('Missing RSS file: ' + configFilename))
        }
        next(null, configFilename)
    })
}

const readRSSFile = function (configFilename) {
    fs.readFile(configFilename, (err, feedList) => {
        if (err) return next(err)

        feedList = feedList
            .toString()
            .replace(/^\s+|\s+$/g, '')
            .split("\n")
        let random = Math.floor(Math.random() * feedList.length)
        next(null, feedList[random])
    })
}

const downloadRSSFeed = function (feedUrl) {
    request({uri: feedUrl}, (err, res, body) => {
        if (err) return next(err)
        if (res.statusCode != 200) {
            return next(new Error('Abnormal response status code'))
        }

        next(null, body)
    })
}

const parseRSSFeed = function (rss){
    let handler = new htmlparser.RssHandler()
    let parser = new htmlparser.Parser(handler)
    parser.parseComplete(rss)

    if (!handler.dom.items.length) {
        return next(new Error('No RSS items found'))
    }

    let item = handler.dom.items.shift()
    log(item.title)
    log(item.link)
}

let tasks = [
    checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed
]

let next = function (err, result) {
    if (err) throw err

    let currentTask = tasks.shift()

    if (currentTask) {
        currentTask(result)
    }
}

next()
