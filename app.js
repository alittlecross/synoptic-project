import express from "express";
import session from "express-session";
import add from "./server/routes/add.js";
import editId from "./server/routes/edit-id.js";
import flash from "./server/plug-ins/flash.js";
import index from "./server/routes/index.js";
import list from "./server/routes/list.js";
import logIn from "./server/routes/log-in.js";
import logOut from "./server/routes/log-out.js";
import questionIdCorrectAnswer from "./server/routes/question-id-correct-answer.js";
import quizId from "./server/routes/quiz-id.js";
import sessionOptions from "./server/plug-ins/session.js";

const app = express();

const port = process.env.APORT || 3000;

app.set("views", "./server/views");
app.use(express.static("./server/public"));

app.use(express.urlencoded({ extended: true }));

app.use(session(sessionOptions));

app.use(flash);

app.get("/", index);

app.get("/log-in", logIn.get);

app.post("/log-in", logIn.post);

app.get("/list", list);

app.get("/log-out", logOut);

app.get("/quiz-:id", quizId);

app.get("/question-:id-correct-answer", questionIdCorrectAnswer);

app.get("/add", add.get);

app.post("/add", add.post);

app.get("/edit-:id", editId.get);

app.post("/edit-:id", editId.post);

app.listen(port);
