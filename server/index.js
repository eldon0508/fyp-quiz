const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const fileUpload = require("express-fileupload");
const nodemailer = require("nodemailer");

const passport = require("passport");
const db = require("./database");
const helper = require("./utils/helper");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(fileUpload());
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Only transmit over HTTPS in production
      httpOnly: true, // Prevent client-side JavaScript access
      sameSite: "lax", // Mitigate CSRF
      maxAge: 1000 * 60 * 60 * 2, // Expire after 2 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// Node mailer configuration for OTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* Quizzer Router */
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ success: false, error: "Unauthorized" });
}

app.post("/signup", async (req, res) => {
  try {
    const { email, password, firstname } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const searchQuery = "SELECT * FROM users WHERE username = $1 AND deleted_at IS NULL";
    const result = await db.query(searchQuery, [email]);

    if (result.length >= 1) {
      return res.json({ success: false });
    }
    const hashedPassword = await helper.hashPassword(password);
    const insertQuery =
      "INSERT INTO users (username, password, firstname, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)";

    await db.query(insertQuery, [email, hashedPassword, firstname, dt, dt]);
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ success: false, error: err });
  }
});

app.post("/signin", async (req, res, next) => {
  await passport.authenticate("quizzer-local", (err, user) => {
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
    return res.redirect("/");
  });
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const randomString = Math.random().toString(20).substring(2, 12);
  const hashedPassword = await helper.hashPassword(randomString);

  // Prepare the email message options.
  const mailOptions = {
    from: {
      name: "SE Quiz Team <no-reply@sequiz.com> ",
      address: "no-reply@quiz.com",
    },
    to: email,
    subject: "Forgot Password - Temporary Password",
    text: `Dear User,\n\nA request has been initiated to reset your password. Please use the following temporary password to log in to your account:
    \nTEMPORARY PASSWORD: ${randomString}
    \nUpon successful login, please create a new, permanent password. This can be done within your profile settings.
    \nFor your security, please note: If you did not request this password reset, please sign in with the temporary password and update a secure password ASAP. However, if you have any concerns about the security of your account, please contact our support team immediately at wick@gmail.com.
    \nSincerely,
    \nThe SE Quiz Support Team`,
  };

  try {
    // Send email and update password, finally log the response.
    await transporter.sendMail(mailOptions);
    console.log("Forgot password email sent successfully.");
    const updateQuery = "UPDATE users SET password = $1 WHERE username = $2";
    await db.query(updateQuery, [hashedPassword, email]);
    return res.status(200).json({ success: true });
  } catch (emailError) {
    console.error("Error sending forgot password email:", emailError);
    return res.status(500).json({ success: false });
  }
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

app.get("/articles", async (req, res) => {
  try {
    const { category_id } = req.query;
    const selectCategoryQuery = "SELECT id, name FROM categories WHERE deleted_at IS NULL LIMIT 5";
    const categories = await db.query(selectCategoryQuery);

    if (category_id) {
      const selectQuery =
        "SELECT a.*, c.name as category_name FROM articles a LEFT JOIN categories c ON a.category_id = c.id WHERE a.category_id = $1 AND a.published = $2 AND a.deleted_at IS NULL";
      const result = await db.query(selectQuery, [category_id, true]);
      return res.status(200).json({ success: true, data: result, categories: categories });
    } else {
      const selectQuery =
        "SELECT a.*, c.name as category_name FROM articles a LEFT JOIN categories c ON a.category_id = c.id WHERE a.deleted_at IS NULL AND a.published = $1";
      const result = await db.query(selectQuery, [true]);
      return res.status(200).json({ success: true, data: result, categories: categories });
    }
  } catch (err) {
    console.error("Get articles error:", err);
    return res.status(500).json({ success: false, error: err });
  }
});

app.get("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const selectQuery = "SELECT * FROM articles WHERE id = $1 AND deleted_at IS NULL";
    const result = await db.query(selectQuery, [id]);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error("Get articles error:", err);
    return res.status(500).json({ success: false });
  }
});

app.get("/profile", ensureAuthenticated, async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM users WHERE id = $1";
    const result = await db.query(selectQuery, [req.user.id]);
    return res.status(200).json({ success: true, profile: result[0] });
  } catch (err) {
    console.error("Get profile error:", err);
    return res.status(500).json({ success: false, error: err });
  }
});

app.put("/profile-update", ensureAuthenticated, async (req, res) => {
  try {
    const { firstname, lastname, dob } = req.body.formData;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const updateQuery = "UPDATE users SET firstname = $1, lastname = $2, dob = $3, updated_at = $4 WHERE id = $5";
    await db.query(updateQuery, [firstname, lastname, dob, dt, req.user.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Profile update error:", err);
    return res.status(500).json({ success: false, error: err });
  }
});

app.put("/password-update", ensureAuthenticated, async (req, res) => {
  try {
    const { password } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const hashedPassword = await helper.hashPassword(password);
    const updateQuery = "UPDATE users SET password = $1, updated_at = $2 WHERE id = $3";
    await db.query(updateQuery, [hashedPassword, dt, req.user.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Password update error:", err);
    return res.status(500).json({ success: false, error: err });
  }
});

app.get("/profile-attempts", ensureAuthenticated, async (req, res) => {
  try {
    const selectQuery =
      "SELECT * FROM quizzes q RIGHT JOIN attempts a ON q.id = a.quiz_id WHERE a.user_id = $1 AND a.deleted_at IS NULL";

    const result = await db.query(selectQuery, [req.user.id]);
    const groupedAttempts = result.reduce((acc, item) => {
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

      return acc;
    }, {});
    const groupedAttemptsArray = Object.values(groupedAttempts);
    return res.status(200).json({
      success: true,
      data: groupedAttemptsArray,
    });
  } catch (err) {
    console.error("Get profile attempts:", err);
    return res.status(500).json({ success: false });
  }
});

app.post("/profile-quiz-feedback", ensureAuthenticated, async (req, res) => {
  try {
    const { quizId, feedback } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const insertQuery =
      "INSERT INTO quiz_feedbacks (user_id, quiz_id, feedback, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)";
    await db.query(insertQuery, [req.user.id, quizId, feedback, dt, dt]);
    return res.status(201).json({ success: true });
  } catch (error) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
});

app.delete("/profile-delete", ensureAuthenticated, async (req, res) => {
  try {
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const deleteQuery = "UPDATE users SET deleted_at = $1, active = $2 WHERE id = $3";
    await db.query(deleteQuery, [dt, false, req.user.id]);

    req.logout(function (err) {
      if (err) return next(err);

      console.log("user logout success", req.user);
      return res.status(200).json({ success: true });
    });
  } catch (err) {
    console.error("Profile delete error:", err);
    return res.status(500).json({ success: false });
  }
});

app.post("/take-quiz", ensureAuthenticated, async (req, res) => {
  try {
    const { quiz_id, quesNum } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);

    // Create attempt and update user lastest attempt time
    const insertQuery =
      "INSERT INTO attempts (user_id, quiz_id, question_number, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id";
    const updateQuery = "UPDATE users SET last_attempt = $1 WHERE id = $2";

    const result = await db.query(insertQuery, [req.user.id, quiz_id, quesNum, dt, dt]);
    await db.query(updateQuery, [dt, req.user.id]);
    return res.status(201).json({ success: true, attempt_id: result[0].id });
  } catch (err) {
    console.error("Take quiz error:", err);
    return res.status(500).json({ success: false, error: err });
  }
});

app.get("/quiz-taking/:attempt_id", ensureAuthenticated, async (req, res) => {
  try {
    const { attempt_id } = req.params;
    const getAttemptsQuery = "SELECT * FROM attempts WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL";
    const attempt = await db.query(getAttemptsQuery, [attempt_id, req.user.id]);

    if (attempt <= 0) {
      return res.status(403).json({ success: false });
    }
    const att = attempt[0];

    // Retrieve questions and quiz information
    const questionsQuery = `SELECT id FROM questions WHERE deleted_at IS NULL ORDER BY RANDOM() LIMIT $1`;
    const qq = await db.query(questionsQuery, [att.question_number]);
    const q_ids = qq.map((q) => q.id);

    const qaQuery =
      "SELECT * FROM questions q LEFT JOIN answers a ON a.question_id = q.id WHERE a.question_id = ANY ($1)";
    const selectQuery = "SELECT * FROM quizzes WHERE id = $1 AND deleted_at IS NULL";

    const data = await db.query(qaQuery, [q_ids]);
    const quiz = await db.query(selectQuery, [att.quiz_id]);

    const groupedQuestions = data.reduce((acc, item) => {
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
    const reindexedQuestions = Object.entries(groupedQuestions).reduce((acc, [key, value], index) => {
      acc[index] = value;
      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      questions: reindexedQuestions,
      quiz: quiz[0],
      attempt_id: att.id,
    });
  } catch (err) {
    console.error("Get quiz taking attempt error:", err);
    return res.status(500).json({ success: false, error: err });
  }
});

// Check question answer and add into attempt_question
app.post("/question-check", ensureAuthenticated, async (req, res) => {
  try {
    const { question_id, answer_id, attempt_id } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const selectQuery =
      "SELECT a.id as id, a.question_id, a.answer_text, a.rate, a.best_answer, q.question_text, q.feedback FROM questions q LEFT JOIN answers a ON q.id = a.question_id WHERE a.question_id = $1";
    const data = await db.query(selectQuery, [question_id]);
    const bestAnswerOption = data.find((d) => d.best_answer);
    const selectedAnswerOption = data.find((d) => d.id == answer_id);

    const insertQuery =
      "INSERT INTO attempt_questions (attempt_id, question_id, selected_answer, best_answer, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)";
    await db.query(insertQuery, [attempt_id, question_id, answer_id, bestAnswerOption.id, dt, dt]);

    return res.status(201).json({
      success: true,
      rate: selectedAnswerOption.rate,
      bestAnswer: bestAnswerOption,
      correctness: answer_id == bestAnswerOption.id,
    });
  } catch (err) {
    console.error("Quiz question check error:", err);
    return res.status(500).json({ success: false });
  }
});

// Submission of attempt
app.post("/quiz-submit", ensureAuthenticated, async (req, res) => {
  try {
    const { attempt_id, questionCorrect, vulRate } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const selectQuery = "SELECT id, question_number FROM attempts WHERE id = $1 AND deleted_at IS NULL";
    const attempts = await db.query(selectQuery, [attempt_id]);
    const att = attempts[0];

    const vRate = vulRate / att.question_number;

    const updateQuery =
      "UPDATE attempts SET question_correct = $1, vulnerability_rate = $2, completed = $3, updated_at = $4 WHERE id = $5";
    await db.query(updateQuery, [questionCorrect, vRate, true, dt, att.id]);

    return res.status(200).json({ success: true, data: att, vulRate: vRate });
  } catch (err) {
    console.error("Quiz submit error:", err);
    return res.status(500).json({ success: false });
  }
});
/* End of Quizzer Route */

/* Admin Route */
// function adminAuthenticated(req, res, next) {
//   if (req.isAuthenticated && req.isAuthenticated() && req.user.role === 1) return next();
//   return res.redirect("http://localhost:3039/admin/signin");
//   return res.status(401).json({ success: false });
// }

app.post("/admin/signin", async (req, res, next) => {
  await passport.authenticate("admin-local", (err, user) => {
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
    return res.redirect("http://localhost:3039/admin/signin");
  });
});

const categoryRouter = require("./routes/category");
const articleRouter = require("./routes/article");
const quizRouter = require("./routes/quiz");
const questionRouter = require("./routes/question");
const answerRouter = require("./routes/answer");
const feedbackRouter = require("./routes/feedback");
const userRoute = require("./routes/user");

app.use("/admin/category", categoryRouter);
app.use("/admin/article", articleRouter);
app.use("/admin/quiz", quizRouter);
app.use("/admin/question", questionRouter);
app.use("/admin/answer", answerRouter);
app.use("/admin/feedback", feedbackRouter);
app.use("/admin/user", userRoute);
/* End of Admin Route */

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
