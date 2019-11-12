const Quiz = require('../lib/quiz')

module.exports = async (req, res) => {
  if (req.session.user) {
    const quiz = await Quiz.getOne(req.params.id)

    res.render('quiz.ejs', {
      quiz: quiz
    })
  } else {
    res.redirect('/')
  }
}
