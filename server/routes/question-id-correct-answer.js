export default (req, res) => {
  if (
    req.session.user &&
    req.session.user.permission !== "restricted" &&
    req.session.quiz
  ) {
    const { quiz } = req.session;
    const question = quiz.questions.filter(
      (_question) => _question.id === parseInt(req.params.id, 10)
    )[0];
    if (question) {
      const correctAnswerId = question.answers.filter(
        (answer) => answer.correct
      )[0].id;
      res.json({ id: correctAnswerId });
    } else {
      res.json({
        warning: "this route does not relate to the currently cached quiz",
      });
    }
  } else {
    res.redirect("/list");
  }
};
