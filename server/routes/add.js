const Add = require('../lib/add')

module.exports = {
  get: (req, res) => {
    delete req.session.quiz

    if (req.session.user.permission === 'edit') {
      res.render('add.ejs')
    } else {
      res.redirect('/')
    }
  },
  post: async (req, res) => {
    delete req.session.quiz

    if (req.session.user.permission === 'edit') {
      await Add.quiz(req.body)

      res.redirect('/list')
    } else {
      res.redirect('/')
    }
  }
}
