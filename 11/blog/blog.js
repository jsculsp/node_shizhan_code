const fs = require('fs')
const http = require('http')
const ejs = require('ejs')
let template = fs.readFileSync('./template/blog_page.ejs', 'utf8')


function getEntries() {
  let entries = []
  let entriesRaw = fs.readFileSync('./entries.txt', 'utf8')

  entriesRaw = entriesRaw.split("---")

  entriesRaw.map(function (entryRaw) {
    let entry = {}
    let lines = entryRaw.split("\n")

    lines.map(function (line) {
      if (line.indexOf('title: ') === 0) {
        entry.title = line.replace('title: ', '')
      }
      else if (line.indexOf('date: ') === 0) {
        entry.date = line.replace('date: ', '')
      }
      else {
        entry.body = entry.body || ''
        entry.body += line
      }
    })

    entries.push(entry)
  })

  return entries
}

let entries = getEntries()
console.log(entries)

let server = http.createServer(function (req, res) {
  blogPage(entries, (str) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(str)
  })
})

server.listen(8000)

function blogPage(entries, cb) {
  let values = {entries: entries}
  ejs.renderFile('./template/blog_page.ejs', values, (err, str) => {
    cb(str)
  })
}
