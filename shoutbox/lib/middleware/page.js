const paginate = (fn, perpage=10) =>{
  return (req, res, next) => {
    let page = Math.max(parseInt(req.params.page || 1)) - 1

    fn((err, total) => {
      if (err) return next(err)

      req.page = res.locals.page = {
        number: page,
        perpage: perpage,
        from: page * perpage,
        to: page * perpage + perpage - 1,
        total: total,
        count: Math.ceil(total / perpage)
      }

      next()
    })
  }
}

module.exports = paginate