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
  } catch (err) {
    console.log(err);
    db.rollback();
    return res.status(500).json({ success: false, error: err });
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
        res.json({ success: true });
      });
    }
  })(req, res, next);
});

app.post("/signout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log("user logout success");
    res.redirect("/articles");
  });
});

app.get("/getAuthUser", (req, res) => {
  try {
    res.json({ data: req.user, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }
});

app.get("/questions", (req, res) => {
  const query = `SELECT * FROM questions`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({
      title: "Quiz Questions",
      questions: data,
    });
  });
});

app.get("/articles", (req, res) => {
  const categoryId = req.query.category;

  var query;
  if (categoryId) {
    query = `SELECT a.*, c.name as category_name 
    FROM articles a
    LEFT JOIN categories c
    ON a.category_id = c.id
    WHERE a.category_id = ${categoryId} AND a.deleted_at IS NULL;
    SELECT id, name FROM categories WHERE deleted_at IS NULL LIMIT 5`;
  } else {
    query = `SELECT a.*, c.name as category_name 
    FROM articles a
    LEFT JOIN categories c
    ON a.category_id = c.id
    WHERE a.deleted_at IS NULL;
    SELECT id, name FROM categories WHERE deleted_at IS NULL LIMIT 5`;
  }

  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ success: true, data: data[0], categories: data[1] });
  });
});

app.get("/take-quiz/:quiz", (req, res) => {
  try {
    const q1 = `SELECT GROUP_CONCAT(DISTINCT id) as ids FROM questions WHERE quiz_id = ${req.params.quiz}`;

    db.query(q1, (err, data) => {
      if (err) return res.status(500).json({ success: false, error: err });
      const question_ids = data[0].ids;
      const q2 = `SELECT q.*, a.* FROM questions q
        RIGHT JOIN answers a
        ON a.question_id = q.id
        WHERE q.deleted_at IS NULL
        AND a.question_id IN (${question_ids})`;

      db.query(q2, (err, data) => {
        if (err) return res.status(500).json({ success: false, error: err });

        const groupedData = data.reduce((acc, item) => {
          const questionText = item.question_text;
          if (!acc[item.question_id]) {
            acc[item.question_id] = {
              question_text: questionText,
              answers: [],
            };
          }
          acc[item.question_id].answers.push({
            answer_text: item.answer_text,
            is_correct: item.is_correct,
          });
          return acc;
        }, {});

        return res.json({ success: true, data: groupedData });
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err });
  }
});

/* Admin Route */
app.post("/admin/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (user) {
      req.login(user, (err) => {
        if (err) {
          console.log(err);
        }
        res.json({ success: true });
      });
    } else {
      res.json({ success: false });
    }
  })(req, res, next);
});

app.get("/admin/signout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log("admin logout success");
    res.redirect("/admin/signin");
  });
});

const categoryRouter = require("./routes/category");
const articleRouter = require("./routes/article");
const quizRouter = require("./routes/quiz");
const userRoute = require("./routes/user");

app.use("/admin/category", categoryRouter);
app.use("/admin/article", articleRouter);
app.use("/admin/quiz", quizRouter);
app.use("/admin/user", userRoute);
/* End of Admin Route */

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
