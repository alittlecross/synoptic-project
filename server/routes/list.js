const Quiz = require('../lib/quiz')

module.exports = async (req, res) => {
  if (req.session.user) {
    delete req.session.quiz

    const permission = req.session.user.permission
    const quizes = await Quiz.list()

    res.render('list.ejs', {
      permission: permission,
      quizes: quizes
    })
  } else {
    res.redirect('/')
  }
}
