let hogan = require('hogan.js')

let studentTemplate = '<p>Name: {{name}}, '
                    + 'Age: {{age}} years old</p>'

let mainTemplate = '{{#students}}'
                 + '{{>student}}'
                 + '{{/students}}'

let context = {
  students: [{
    name: 'Jane Narwal',
    age: 21
  },{
    name :'rick larue',
    age: 26
  }]
}

let template = hogan.compile(mainTemplate)
let partial = hogan.compile(studentTemplate)

let html = template.render(context, {student: partial})
console.log(html)
