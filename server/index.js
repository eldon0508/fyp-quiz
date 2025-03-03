const express = require("express");
const app = express();
const db = require("./database");
const cors = require("cors");
const path = require("path");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const fileUpload = require("express-fileupload");

const passport = require("passport");
const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 3001;
const saltRounds = 10;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(flash());
app.use(fileUpload());

app.use(cookieParser("secret"));
app.use(
  session({
    secret: "fyp-quiz-secret",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({ success: false });
}

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
        const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
        const q2 = {
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
  passport.authenticate("quizzer-local", (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }

    if (user) {
      req.login(user, (err) => {
        if (err) console.error(err);
        return res.json({ success: true });
      });
    } else {
      return res.status(401).json({ success: false });
    }
  })(req, res, next);
});

app.post("/signout", (req, res) => {
  req.logout(function (err) {
    if (err) return next(err);

    console.log("user logout success", req.user);
    res.redirect("/");
  });
});

app.get("/getAuthUser", (req, res) => {
  try {
    if (req.user) {
      return res.json({ data: req.user, success: true });
    }
    return res.json({ success: false });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err });
  }
});

app.get("/profile", ensureAuthenticated, (req, res) => {
  console.log("Profile route handler reached"); // Add this log
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
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const q2 = {
      firstname: req.body.formData.firstname,
      lastname: req.body.formData.lastname ?? null,
      dob: req.body.formData.dob ?? null,
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

app.put("/password-update", (req, res) => {
  db.beginTransaction();
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const q2 = {
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

app.get("/profile-attempts", ensureAuthenticated, (req, res) => {
  try {
    // const q = `SELECT *, a.created_at AS a_created_at, a.updated_at AS a_updated_at
    //     FROM attempt_questions aq
    //     LEFT JOIN attempts a
    //     ON a.id = aq.attempt_id
    //     LEFT JOIN quizzes q
    //     ON q.id = a.quiz_id
    //     WHERE a.user_id = 2
    //     AND a.deleted_at IS NULL`;

    const q = `SELECT * FROM quizzes q
          RIGHT JOIN attempts a
          ON q.id = a.quiz_id
          WHERE a.user_id = ${req.user.id}
          AND a.deleted_at IS NULL`;

    db.query(q, (err, data) => {
      if (err) return res.status(500).json({ success: false, error: err });

      const groupedAttempts = data.reduce((acc, item) => {
        const attempt_id = item.id;
        if (!acc[attempt_id]) {
          acc[attempt_id] = {
            id: item.id,
            question_number: item.question_number,
            question_correct: item.question_correct,
            rate: item.vulnerability_rate,
            completed: item.completed ? "Completed" : "Unfinished",
            created_at: item.created_at,
            timeUsed: (item.updated_at - item.created_at) / 1000,
            quiz: {
              id: item.quiz_id,
              name: item.name,
              description: item.description,
            },
          };
        }

        // const groupedAttempts = data.reduce((acc, item) => {
        //   const attempt_id = item.attempt_id;
        //   if (!acc[attempt_id]) {
        //     acc[attempt_id] = {
        //       id: item.attempt_id,
        //       question_correct: item.question_correct,
        //       question_number: item.question_number,
        //       completed: item.completed ? "Completed" : "Uncompleted",
        //       timeUsed: (item.a_updated_at - item.a_created_at) / 1000,
        //       // created_at: item.a_created_at,
        //       // updated_at: item.a_updated_at,
        //       quiz: {
        //         id: item.quiz_id,
        //         name: item.name,
        //         description: item.description,
        //         level: item.level,
        //       },
        //       questions: [],
        //     };
        //   }

        //   acc[attempt_id].questions.push({
        //     id: item.question_id,
        //     selected_answer: item.selected_answer,
        //     correct_answer: item.correct_answer,
        //     is_correct: item.is_correct,
        //   });
        return acc;
      }, {});

      const groupedAttemptsArray = Object.values(groupedAttempts);

      return res.json({
        success: true,
        data: groupedAttemptsArray,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
});

app.post("/profile-quiz-feedback", (req, res) => {
  db.beginTransaction();
  try {
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const user_id = req.user.id;
    const q1 = {
      user_id: user_id,
      quiz_id: req.body.quizId,
      feedback: req.body.feedback,
      created_at: dt,
      updated_at: dt,
    };

    const q = `INSERT INTO quiz_feedbacks SET ?`;
    db.query(q, q1);
    db.commit();
    return res.json({ success: true });
  } catch (error) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false });
  }
});

app.delete("/profile-delete", (req, res) => {
  console.log(req.user, req.body, "abababba");
  db.beginTransaction();
  try {
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const query = `UPDATE users SET deleted_at = "${dt}" WHERE id = "${req.user.id}"`;
    db.query(query);
    db.commit();
    return res.json({ success: true });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false });
  }
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
        WHERE a.category_id = ${categoryId} AND a.deleted_at IS NULL AND a.published = 1;
        SELECT id, name FROM categories WHERE deleted_at IS NULL LIMIT 5`;
    } else {
      query = `SELECT a.*, c.name as category_name 
        FROM articles a
        LEFT JOIN categories c
        ON a.category_id = c.id
        WHERE a.deleted_at IS NULL AND a.published = 1;
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

app.get("/articles/:id", (req, res) => {
  try {
    const query = `SELECT * FROM articles WHERE id = ${req.params.id} AND deleted_at IS NULL`;

    db.query(query, (err, data) => {
      return res.json({ success: true, data: data });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
});

app.post("/take-quiz", (req, res) => {
  db.beginTransaction();

  try {
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const questionNum = req.body.quesNum;
    const quiz_id = req.body.quiz_id;
    const data1 = {
      user_id: req.user.id,
      quiz_id: quiz_id,
      question_number: questionNum,
      created_at: dt,
      updated_at: dt,
    };

    // Create attempt and update user lastest attempt time
    const attemptQuery = `INSERT INTO attempts SET ?; UPDATE users SET last_attempt = "${dt}" WHERE id = ${req.user.id};`;
    db.query(attemptQuery, data1, (err, data) => {
      db.commit();
      return res.json({ success: true, attempt_id: data[0].insertId });
    });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false, error: err });
  }
});

app.get("/quiz-taking/:attempt_id", ensureAuthenticated, (req, res) => {
  try {
    const attemptQuery = `SELECT * FROM attempts WHERE id = ${req.params.attempt_id} AND deleted_at IS NULL`;

    db.query(attemptQuery, (err, attemptData) => {
      const att = attemptData[0];

      // Retrieve questions and quiz information
      const questionsQuery = `SELECT id FROM questions WHERE deleted_at IS NULL ORDER BY RAND() LIMIT ${att.question_number}`;
      db.query(questionsQuery, (err, qq) => {
        const q_ids = qq.map((q) => q.id);
        const qaQuery = `SELECT * FROM questions q LEFT JOIN answers a ON a.question_id = q.id WHERE a.question_id IN (${q_ids});
          SELECT * FROM quizzes WHERE id = ${att.quiz_id} AND deleted_at IS NULL;`;
        db.query(qaQuery, (err, data) => {
          const qas = data[0];
          const groupedQuestions = qas.reduce((acc, item) => {
            if (!acc[item.question_id]) {
              acc[item.question_id] = {
                question_text: item.question_text,
                question_id: item.question_id,
                answers: [],
              };
            }
            acc[item.question_id].answers.push({
              answer_text: item.answer_text,
              answer_id: item.id,
              rate: item.rate,
              best_answer: item.best_answer,
            });
            return acc;
          }, {});

          // Re-index to start from 1 for front-end to display question number
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
            quiz: data[1][0],
            attempt_id: att.id,
          });
        });
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err });
  }
});

// Check question answer and add into attempt_question
app.post("/quiz-question-check", (req, res) => {
  db.beginTransaction();

  try {
    const query = `SELECT * FROM questions q
      LEFT JOIN answers a
      ON q.id = a.question_id
      WHERE a.question_id = ${req.body.question_id};`;

    db.query(query, (err, data) => {
      const bestAnswerOption = data.find((d) => d.best_answer);
      const selectedAnswerOption = data.find(
        (d) => d.id === req.body.answer_id
      );

      const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
      const v1 = {
        attempt_id: req.body.attempt_id,
        question_id: req.body.question_id,
        selected_answer: req.body.answer_id,
        best_answer: bestAnswerOption.id,
        created_at: dt,
        updated_at: dt,
      };
      const query1 = `INSERT INTO attempt_questions SET ?`;
      db.query(query1, v1);
      db.commit();
      return res.json({
        success: true,
        rate: selectedAnswerOption.rate,
        bestAnswer: bestAnswerOption,
        correctness: req.body.answer_id === bestAnswerOption.id,
      });
    });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false });
  }
});

// Submission of attempt
app.post("/quiz-submit", (req, res) => {
  db.beginTransaction();

  try {
    const attQuery = `SELECT * FROM attempts WHERE id = ${req.body.attempt_id} AND deleted_at IS NULL`;

    db.query(attQuery, (err, atts) => {
      const att = atts[0];

      const upQuery = `UPDATE attempts SET ? WHERE id = ${att.id}`;
      const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
      const d1 = {
        question_correct: req.body.questionCorrect,
        vulnerability_rate: req.body.vulRate / att.question_number,
        completed: true,
        updated_at: dt,
      };

      db.query(upQuery, d1);
      db.commit();
      return res.json({
        success: true,
        data: att,
        vulRate: d1.vulnerability_rate,
      });
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
  passport.authenticate("admin-local", (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }

    if (user) {
      req.login(user, (err) => {
        if (err) console.error(err);
        return res.json({ success: true });
      });
    } else {
      return res.status(401).json({ success: false });
    }
  })(req, res, next);
});

app.post("/admin/signout", (req, res) => {
  req.logout(function (err) {
    if (err) return next(err);

    res.redirect("http://localhost:3039/admin/signin");
  });
});

const categoryRouter = require("./routes/category");
const articleRouter = require("./routes/article");
const quizRouter = require("./routes/quiz");
const questionRouter = require("./routes/question");
const answerRouter = require("./routes/answer");
const userRoute = require("./routes/user");

app.use("/admin/category", categoryRouter);
app.use("/admin/article", articleRouter);
app.use("/admin/quiz", quizRouter);
app.use("/admin/question", questionRouter);
app.use("/admin/answer", answerRouter);
app.use("/admin/user", userRoute);
/* End of Admin Route */

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
