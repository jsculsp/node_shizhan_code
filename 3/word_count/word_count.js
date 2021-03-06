const fs = require('fs')
const filesDir = './text'
const log = console.log.bind(console)

let completedTasks = 0
let tasks = []
let wordCounts = {}

const checkIfComplete = function () {
    completedTasks++
    if (completedTasks === tasks.length) {
        for (let index in wordCounts) {
            log(index + ': ' + wordCounts[index])
        }
    }
}

const countWordsInText = function (text) {
    let words = text
        .toString()
        .toLowerCase()
        .split(/\W+/)
        .sort()
    for (let word of words) {
        if (word) {
            wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1
        }
    }
}

const genTask = function (file) {
    return function () {
        fs.readFile(file, function (err, text) {
            if (err) throw err
            countWordsInText(text)
            checkIfComplete()
        })
    }
}

const readDir = function () {
    fs.readdir(filesDir, (err, files) => {
        if (err) throw err
        for (let f of files) {
            let task = genTask(filesDir + '/' + f)
            tasks.push(task)
        }
        for (let t of tasks) {
            t()
        }
    })
}

const __main = function () {
    readDir()
}

__main()
