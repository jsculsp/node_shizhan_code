const fs = require('fs')
const path = require('path')
let args = process.argv.splice(2)
let command = args.shift()
let taskDescription = args.join(' ')
let file = path.join(process.cwd(), '/tasks.json')

const loadOrInitializeTaskArray = function (file, cb) {
    fs.exists(file, function (exists) {
        if (exists) {
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) throw err
                data = data.toString()
                let tasks = JSON.parse(data || '[]')
                cb(tasks)
            })
        } else {
            cb([])
        }
    })
}

const listTasks = function (file) {
    loadOrInitializeTaskArray(file, function (tasks) {
        for (let i in tasks) {
            console.log(tasks[i])
        }
    })
}

const storeTasks = function (file, tasks) {
    fs.writeFile(file, JSON.stringify(tasks), 'utf8', function (err) {
        if (err) throw err
        console.log('Saved.')
    })
}

const addTask = function (file, taskDescription) {
    loadOrInitializeTaskArray(file, function (tasks) {
        tasks.push(taskDescription)
        storeTasks(file, tasks)
    })
}

const act = function () {
    let defaultVal = () => {
        return console.log(`Usage: node list|add [taskDescription]`)
    }

    let handler = {
        get: (target, name) => {
            return target.hasOwnProperty(name) ? target[name]: defaultVal
        }
    }

    let actions = {
        list: listTasks,
        add: addTask,
    }

    let p = new Proxy(actions, handler)

    p[command](file, taskDescription)
}

const __main = function () {
    act()
}

__main()