const express = require("express");
const db = require("./database");
const cors = require("cors");
const path = require("path"),
  flash = require("connect-flash"),
  session = require("express-session"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  passport = require("passport"),
  fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());
app.use(passport.authenticate("session"));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.json({ title: "Home" });
});

app.get("/questions", (req, res) => {
  const query = `SELECT * FROM questions`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ title: "Quiz Questions", questions: data });
  });
});

app.get("/articles", (req, res) => {
  const query = `SELECT * FROM articles WHERE deleted_at IS NULL`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ title: "Articles", articles: data[0] });
  });
});

const articleRouter = require("./routes/article");
const categoryRouter = require("./routes/category");

app.use("/admin/article", articleRouter);
app.use("/admin/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
