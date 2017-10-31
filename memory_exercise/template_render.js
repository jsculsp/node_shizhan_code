const log = console.log.bind(console)

const escape = function (html) {
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const compile = function (str) {
  let tpl = str.replace(/<%= ([\s\S]+?) %>/g, function (match, code) {
    return `' + ${code} + '`
  })

  tpl = `tpl = '${tpl}'`

  tpl = `
    let tpl = ''
    with (obj) {
      ${tpl}
    }
    return tpl
  `

  let compiled = new Function('obj', tpl)
  return compiled
}

const render = function (compiled, data) {
  return compiled(data)
}

let tpl = `Hello <%= 'username' %>.`
console.log(render(compile(tpl), {username: 'Jackson Tian'}))