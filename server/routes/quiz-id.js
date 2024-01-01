import Quiz from "../lib/quiz.js";

export default async (req, res) => {
  if (req.session.user) {
    const { permission } = req.session.user;
    const quiz = await Quiz.getOne(req.params.id);

    req.session.quiz = quiz;

    res.render("quiz-id.ejs", {
      permission,
      quiz,
    });
  } else {
    res.redirect("/");
  }
};
