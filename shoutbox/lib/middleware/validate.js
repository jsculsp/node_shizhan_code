const getField = (req, field) => {
  let obj = req.body
  let val = obj[field]
  return val
}

const required = (field) => {
  return (req, res, next) => {
    if (getField(req, field)) {
      next()
    } else {
      res.error(`${field} is required`)
      res.redirect('back')
    }
  }
}

const lengthAbove = (field, len) => {
  return (req, res, next) => {
    if (getField(req, field).length > len) {
      next()
    } else {
      res.error(`${field} must have more than ${len} characters`)
      res.redirect('back')
    }
  }
}

module.exports = {
  required,
  lengthAbove,
}