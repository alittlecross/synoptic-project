module.exports = (req, res) => {
  req.session.destroy()

  res.render('index.ejs', {
    flash: res.locals.flash
  })
}
