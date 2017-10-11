const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/tasks')

let Schema = mongoose.Schema
let Tasks = new Schema({
    project: String,
    description: String
})
mongoose.model('Task', Tasks)

let Task = mongoose.model('Task')

// 运行其它函数前把这个函数注释掉
let task = new Task()
task.project = 'Bikeshed'
task.description = 'Paint the bikeshed red.'
task.save(function (err) {
    if (err) throw err
    console.log('Task saved.')
})

// 运行其它函数前把这个函数注释掉
Task.find({'project': 'Bikeshed'}, function (err, tasks) {
    for (let i = 0; i < tasks.length; i++) {
        console.log('ID:' + tasks[i]._id)
        console.log(tasks[i].description)
    }
})

// 运行其它函数前把这个函数注释掉
Task.update(
    {_id: '59dde6c0d2b669566cfe3c9c'},
    {description: 'Paint the bike green.'},
    {multi: false},
    (err, rows_updated) => {
        if (err) {
            throw err
        }

        console.log(`${rows_updated} updated!`)
    }
)