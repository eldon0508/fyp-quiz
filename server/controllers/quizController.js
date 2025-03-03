const db = require("../database");

const index = (req, res) => {
  const query = `SELECT * FROM quizzes WHERE deleted_at IS NULL`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ data: data });
  });
};

const store = (req, res) => {
  db.beginTransaction();

  try {
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const q2 = {
      name: req.body.name,
      description: req.body.description,
      created_at: dt,
      updated_at: dt,
    };

    const query = `INSERT quizzes SET ?`;

    db.query(query, q2);
    db.commit();
    return res.json({ success: true });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false });
  }
};

const edit = (req, res) => {
  const query = `SELECT * FROM quizzes WHERE id = ${req.params.id}`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ data: data[0] });
  });
};

const update = (req, res) => {
  db.beginTransaction();

  try {
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const q2 = {
      name: req.body.name,
      description: req.body.description,
      updated_at: dt,
    };
    const query = `UPDATE quizzes SET ? WHERE id = "${req.params.id}"`;

    db.query(query, q2);
    db.commit();
    return res.json({ success: true });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false });
  }
};

const destroy = (req, res) => {
  db.beginTransaction();

  try {
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    query = `UPDATE quizzes SET deleted_at = "${dt}" WHERE id = "${req.params.id}"`;
    db.query(query);
    db.commit();
    return res.json({ success: true });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false });
  }
};

module.exports = { index, store, edit, update, destroy };
