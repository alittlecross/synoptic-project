const Quiz = require('../lib/quiz')

module.exports = async (req, res) => {
  if (req.session.user) {
    const permission = req.session.user.permission
    const quiz = await Quiz.getOne(req.params.id)

    req.session.quiz = quiz

    res.render('quiz-id.ejs', {
      permission: permission,
      quiz: quiz
    })
  } else {
    res.redirect('/')
  }
}
