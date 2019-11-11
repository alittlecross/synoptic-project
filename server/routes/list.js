module.exports = (req, res) => {
  if (req.session.user) {
    res.render('list.ejs', {

    })
  } else {
    res.redirect('/')
  }
}
