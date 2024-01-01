import Quiz from "../lib/quiz.js";

export default async (req, res) => {
  if (req.session.user) {
    delete req.session.quiz;

    const { permission } = req.session.user;
    const quizes = await Quiz.list();

    res.render("list.ejs", {
      permission,
      quizes,
    });
  } else {
    res.redirect("/");
  }
};
