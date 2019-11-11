module.exports = (req, res) => {
  res.render('index.ejs', {
    flash: res.locals.flash
  })
}
