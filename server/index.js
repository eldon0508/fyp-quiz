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

/* Quizzer Router */
app.post("/signup", async (req, res) => {
  db.beginTransaction();

  try {
    const q = `SELECT * FROM users WHERE username = "${req.body.email}"`;

    db.query(q, (err, data) => {
      if (data.length >= 1) {
        return res.json({ success: false });
      } else {
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        var d = new Date(),
          dt = d.toISOString().replace("T", " ").substring(0, 19),
          q2 = {
            username: req.body.email,
            password: hashedPassword,
            firstname: req.body.firstname,
            created_at: dt,
            updated_at: dt,
          };

        var query = `INSERT users SET ?`;
        db.query(query, q2);
        db.commit();
        return res.json({ success: true });
      }
    });
  } catch (err) {
    console.error(err);
    db.rollback();
    return res.status(500).json({ success: false, error: err });
  }
});

app.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (user) {
      req.login(user, (err) => {
        if (err) {
          console.error(err);
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
    res.redirect("/signin");
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

app.get("/profile", (req, res) => {
  try {
    const q = `SELECT * FROM users WHERE id = ${req.user.id}`;
    db.query(q, (err, data) => {
      return res.json({ success: true, profile: data[0] });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err });
  }
});

app.put("/profile-update", (req, res) => {
  db.beginTransaction();
  try {
    console.log(req.body, "bodydydyddy");
    var d = new Date(),
      dt = d.toISOString().replace("T", " ").substring(0, 19),
      q2 = {
        updated_at: dt,
      };
    const query = `UPDATE users SET ? WHERE id = ${req.user.id}`;
    // db.query(query, q2);
    // db.commit();
    return res.json({ success: true });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false, error: err });
  }
});

app.put("/password-update", (req, res) => {
  db.beginTransaction();
  try {
    console.log(req.body, "abababaa");
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    var d = new Date(),
      dt = d.toISOString().replace("T", " ").substring(0, 19),
      q2 = {
        password: hashedPassword,
        updated_at: dt,
      };

    const query = `UPDATE users SET ? WHERE id = ${req.user.id}`;
    db.query(query, q2);
    db.commit();
    return res.json({ success: true });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false, error: err });
  }
});

app.get("/user-attempts", (req, res) => {
  const query = `SELECT * FROM attempts a
      LEFT JOIN attempt_questions aq
      ON aq.attempt_id = a.id
      WHERE a.user_id = ${req.user.id}
      AND a.deleted_at IS NULL`;
  db.query(query, (err, data) => {
    // time use updated - created
    const completed = data.filter((d) => d.completed);
    const uncompleted = data.filter((d) => !d.completed);
    return res.json({
      completed: completed,
      uncompleted: uncompleted,
    });
  });
});

app.get("/articles", (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err });
  }
});

app.get("/take-quiz/:quiz", (req, res) => {
  db.beginTransaction();

  try {
    const query = `SELECT * FROM quizzes WHERE id = ${req.params.quiz};SELECT GROUP_CONCAT(DISTINCT id) as ids FROM questions WHERE quiz_id = ${req.params.quiz}`;

    db.query(query, (err, data) => {
      if (err) return res.status(500).json({ success: false, error: err });
      // const question_ids = data[1][0].ids;
      // const q1 = `SELECT q.*, a.* FROM questions q
      //   RIGHT JOIN answers a
      //   ON a.question_id = q.id
      //   WHERE q.deleted_at IS NULL
      //   AND a.question_id IN (${question_ids})`;

      const quiz = data[0][0];
      const q1 = `SELECT q.*, a.* FROM questions q
        RIGHT JOIN answers a
        ON a.question_id = q.id
        WHERE q.quiz_id = ${quiz.id}
        AND q.deleted_at IS NULL`;

      db.query(q1, (err, data) => {
        if (err) return res.status(500).json({ success: false, error: err });

        const groupedQuestions = data.reduce((acc, item) => {
          const questionText = item.question_text;

          if (!acc[item.question_id]) {
            acc[item.question_id] = {
              question_text: questionText,
              question_id: item.question_id,
              answers: [],
            };
          }
          acc[item.question_id].answers.push({
            answer_text: item.answer_text,
            answer_id: item.id,
            is_correct: item.is_correct,
          });
          return acc;
        }, {});

        const reindexedData = Object.entries(groupedQuestions).reduce(
          (acc, [key, value], index) => {
            acc[index] = value;
            return acc;
          },
          {}
        );

        return res.json({
          success: true,
          questions: reindexedData,
          quiz: quiz,
        });
      });
    });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false, error: err });
  }
});

app.post("/start-quiz", (req, res) => {
  db.beginTransaction();

  try {
    const d = new Date();
    const dt = d.toISOString().replace("T", " ").substring(0, 19);
    const user_id = req.user.id;
    const quiz_id = req.body.quiz_id;
    const q1 = {
      user_id: user_id,
      quiz_id: quiz_id,
      created_at: dt,
      updated_at: dt,
    };

    const query = `INSERT INTO attempts SET ?; UPDATE users SET last_attempt = "${dt}" WHERE id = ${req.user.id}`;
    db.query(query, q1, (err, data) => {
      db.commit();
      return res.json({ success: true, attempt_id: data[0].insertId });
    });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false, error: err });
  }
});

app.post("/quiz-question-check", (req, res) => {
  db.beginTransaction();

  try {
    const query = `SELECT * FROM questions q
      LEFT JOIN answers a
      ON q.id = a.question_id
      WHERE a.question_id = ${req.body.question_id};`;

    db.query(query, (err, data) => {
      const correctAns = data.find((d) => d.is_correct);

      const d = new Date();
      const dt = d.toISOString().replace("T", " ").substring(0, 19);
      const v1 = {
        attempt_id: req.body.attempt_id,
        question_id: req.body.question_id,
        selected_answer: req.body.answer_id,
        correct_answer: correctAns.id,
        is_correct: correctAns.id === req.body.answer_id ? true : false,
        created_at: dt,
        updated_at: dt,
      };

      const query1 = `INSERT INTO attempt_questions SET ?`;
      db.query(query1, v1);
      db.commit();
      return res.json({
        success: true,
        correctness: v1.is_correct,
        feedback: correctAns.feedback,
      });
    });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false });
  }
});

app.post("/quiz-submit", (req, res) => {
  db.beginTransaction();

  try {
    const query = `SELECT * FROM attempts a
      LEFT JOIN attempt_questions aq
      ON aq.attempt_id = a.id
      WHERE a.id = ${req.body.attempt_id}
      AND a.deleted_at IS NULL`;

    db.query(query, (err, data) => {
      const num = data.length;
      const corr = data.filter((d) => d.is_correct).length;

      var d = new Date(),
        dt = d.toISOString().replace("T", " ").substring(0, 19),
        q2 = {
          question_correct: corr,
          question_number: num,
          completed: true,
          updated_at: dt,
        };

      const q1 = `UPDATE attempts SET ? WHERE id = ${req.body.attempt_id}`;

      db.query(q1, q2);
      db.commit();
      return res.json({ success: true, data: data });
    });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false });
  }
});
/* End of Quizzer Route */

/* Admin Route */
app.post("/admin/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (user) {
      req.login(user, (err) => {
        if (err) {
          console.error(err);
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
