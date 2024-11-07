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

app.get("/admin/articles", (req, res) => {
  const query = `
  SELECT a.*, c.name as category_name 
  FROM articles a
  LEFT JOIN categories c
  ON a.category_id = c.id  
  WHERE a.deleted_at IS NULL`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ title: "Articles", articles: data });
  });
});

app.get("/admin/articles/create", (req, res) => {
  const query = `SELECT id, name FROM categories WHERE deleted_at IS NULL`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ categories: data });
  });
});

app.post("/admin/articles/store", (req, res) => {
  db.beginTransaction();

  try {
    const d = new Date();
    const dt = d.toISOString().replace("T", " ").substring(0, 19);
    const q2 = {
      category_id: req.body.category_id,
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      created_at: dt,
      updated_at: dt,
    };

    console.log(q2, "aaaaa", req.body);
    const query = `INSERT articles SET ?`;

    db.query(query, q2);
    db.commit();
    return res.json({ success: true });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500);
  }
});

app.get("/admin/articles/:id/edit", (req, res) => {
  const query = `SELECT * FROM articles WHERE id = ${req.params.id}; SELECT id, name FROM categories WHERE deleted_at IS NULL`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ article: data[0][0], categories: data[1] });
  });
});

app.put("/admin/articles/:id/update", (req, res) => {
  db.beginTransaction();

  try {
    const d = new Date();
    const dt = d.toISOString().replace("T", " ").substring(0, 19);
    const q2 = {
      category_id: req.body.category_id,
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      updated_at: dt,
    };
    const query = `UPDATE articles SET ? WHERE id = "${req.params.id}"`;

    db.query(query, q2);
    db.commit();
    return res.json({ success: true });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500);
  }
});

app.delete("/admin/articles/:id/destroy", (req, res) => {
  db.beginTransaction();

  try {
    const d = new Date();
    const dt = d.toISOString().replace("T", " ").substring(0, 19);
    query = `UPDATE articles SET deleted_at = "${dt}" WHERE id = "${req.params.id}"`;
    db.query(query);
    db.commit();
    return res.json({ success: true });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
