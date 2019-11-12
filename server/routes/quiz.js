const Quiz = require('../lib/quiz')

module.exports = async (req, res) => {
  if (req.session.user) {
    const permission = req.session.user.permission
    const quiz = await Quiz.getOne(req.params.id)

    res.render('quiz.ejs', {
      permission: permission,
      quiz: quiz
    })
  } else {
    res.redirect('/')
  }
}
