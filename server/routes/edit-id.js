const Quiz = require('../lib/quiz')
const Edit = require('../lib/edit')

module.exports = {
  get: async (req, res) => {
    const quiz = await Quiz.getOne(req.params.id)

    req.session.edit = quiz

    res.render('edit-id.ejs', {
      quiz: quiz
    })
  },
  post: async (req, res) => {
    const quiz = req.session.edit

    delete req.session.edit

    const deleted = await Edit.quiz(req.body, quiz)

    if (deleted) {
      res.redirect('/list')
    } else {
      res.redirect(`/quiz-${quiz.id}`)
    }
  }
}
