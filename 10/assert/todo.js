class Todo {
  constructor() {
    this.todos = []
  }

  add(item) {
    if (!item) throw new Error('Todo#add requires an item')
    this.todos.push(item)
  }

  deleteAll() {
    this.todos = []
  }

  getCount() {
    return this.todos.length
  }

  doAsync(cb) {
    setTimeout(cb, 200, true)
  }
}

module.exports = Todo
