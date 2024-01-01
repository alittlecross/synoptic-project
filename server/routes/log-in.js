import LogIn from "../lib/log-in.js";

export default {
  get: (req, res) => {
    res.redirect("/list");
  },
  post: async (req, res) => {
    const logIn = await LogIn.authenticate(req.body);

    if (logIn.success) {
      req.session.user = logIn.user;

      res.redirect("/list");
    } else {
      req.session.flash = { message: "Username or password incorrect" };

      res.redirect("/");
    }
  },
};
