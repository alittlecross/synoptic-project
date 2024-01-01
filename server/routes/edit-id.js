import Quiz from "../lib/quiz.js";
import Edit from "../lib/edit.js";

export default {
  get: async (req, res) => {
    if (req.session.user && req.session.user.permission === "edit") {
      const quiz = await Quiz.getOne(req.params.id);

      req.session.quiz = quiz;

      res.render("edit-id.ejs", {
        quiz,
      });
    } else {
      res.redirect("/list");
    }
  },
  post: async (req, res) => {
    if (req.session.user && req.session.user.permission === "edit") {
      const { quiz } = req.session;
      const deleted = await Edit.quiz(req.body, quiz);

      if (deleted) {
        res.redirect("/list");
      } else {
        res.redirect(`/quiz-${quiz.id}`);
      }
    } else {
      res.redirect("/list");
    }
  },
};
