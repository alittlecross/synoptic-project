export default {
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSIONSECRET || "no-secret",
};
