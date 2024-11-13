const express = require("express");
const db = require("./database");
const cors = require("cors");
const path = require("path"),
  flash = require("connect-flash"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  fileUpload = require("express-fileupload");

const passport = require("passport");
const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 3001;
const saltRounds = 10;

const app = express();

app.use(
  expressSession({ secret: "secret", saveUninitialized: false, resave: false })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(flash());
app.use(fileUpload());

app.use(cookieParser("secret"));
app.use(passport.initialize());
app.use(passport.authenticate("session"));
require("./passportConfig")(passport);

app.get("/questions", (req, res) => {
  const query = `SELECT * FROM questions`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({
      title: "Quiz Questions",
      questions: data,
      loginUser: req.user,
    });
  });
});

app.get("/articles", (req, res) => {
  const query = `SELECT * FROM articles WHERE deleted_at IS NULL;
        SELECT id, name FROM categories WHERE deleted_at IS NULL ORDER BY RAND() LIMIT 5`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ success: true, data: data[0], categories: data[1] });
  });
});

// const userRouter = require("./routes/frontend/user");

app.post("/signup", async (req, res) => {
  db.beginTransaction();

  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    var d = new Date(),
      dt = d.toISOString().replace("T", " ").substring(0, 19),
      q2 = {
        username: req.body.email,
        password: hashedPassword,
        fullname: req.body.fullname,
        created_at: dt,
        updated_at: dt,
      };

    var query = `INSERT users SET ?`;
    db.query(query, q2);
    db.commit();
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    db.rollback();
    return res.status(500).json({ success: false });
  }
});

app.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (user) {
      req.login(user, (err) => {
        if (err) {
          console.log(err);
        }
        res.json({ user: user, success: true });
      });
    }
  })(req, res, next);
});

app.post("/signout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/articles");
  });
});

app.get("/getAuthUser", (req, res) => {
  try {
    res.json({ data: req.user, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/* Admin Route */
const categoryRouter = require("./routes/category");
const articleRouter = require("./routes/article");
const quizRouter = require("./routes/quiz");

app.use("/admin/category", categoryRouter);
app.use("/admin/article", articleRouter);
app.use("/admin/quiz", quizRouter);
/* End of Admin Route */

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
