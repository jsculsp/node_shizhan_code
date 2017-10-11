const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/tasks')

let Schema = mongoose.Schema
let Tasks = new Schema({
    project: String,
    description: String
})
mongoose.model('Task', Tasks)

let Task = mongoose.model('Task')
let task = new Task()
task.project = 'Bikeshed'
task.description = 'Paint the bikeshed red.'
task.save(function (err) {
    if (err) throw err
    console.log('Task saved.')
})

Task.find({'project': 'Bikeshed'}, function (err, tasks) {
    for (let i = 0; i < tasks.length; i++) {
        console.log('ID:' + tasks[i]._id)
        console.log(tasks[i].description)
    }
})
