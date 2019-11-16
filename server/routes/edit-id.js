const Quiz = require('../lib/quiz')
const Edit = require('../lib/edit')

module.exports = {
  get: async (req, res) => {
    if (req.session.user && req.session.user.permission === 'edit') {
      const quiz = await Quiz.getOne(req.params.id)

      req.session.quiz = quiz

      res.render('edit-id.ejs', {
        quiz: quiz
      })
    } else {
      res.redirect('/')
    }
  },
  post: async (req, res) => {
    if (req.session.user && req.session.user.permission === 'edit') {
      const quiz = req.session.quiz
      const deleted = await Edit.quiz(req.body, quiz)

      if (deleted) {
        res.redirect('/list')
      } else {
        res.redirect(`/quiz-${quiz.id}`)
      }
    } else {
      res.redirect('/')
    }
  }
}
