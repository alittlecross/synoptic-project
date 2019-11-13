module.exports = (req, res) => {
  if (req.session.user && req.session.user.permission !== 'restricted' && req.session.quiz) {
    const quiz = req.session.quiz
    const question = quiz.questions.filter(question => question.id === parseInt(req.params.id))[0]
    if (question) {
      const correctAnswerId = question.answers.filter(answer => answer.correct)[0].id
      res.json({ id: correctAnswerId })
    } else {
      res.json({ 'warning': 'this route does not relate to the currently cached quiz' })
    }
  } else {
    res.redirect('/')
  }
}
