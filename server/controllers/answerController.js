const db = require("../database");

const index = (req, res) => {
  const query = `SELECT a.*, q.question_text as question_name
      FROM answers a
      LEFT JOIN questions q
      ON a.question_id = q.id
      WHERE a.deleted_at IS NULL`;
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
      question_id: req.body.question_id,
      answer_text: req.body.answer_text,
      rate: req.body.rate,
      best_answer: req.body.best_answer,
      created_at: dt,
      updated_at: dt,
    };

    const query = `INSERT answers SET ?`;

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
  const query = `SELECT * FROM answers WHERE id = ${req.params.id}`;
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
      question_id: req.body.question_id,
      answer_text: req.body.answer_text,
      rate: req.body.rate,
      best_answer: req.body.best_answer,
      updated_at: dt,
    };
    const query = `UPDATE answers SET ? WHERE id = "${req.params.id}"`;

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
    query = `UPDATE answers SET deleted_at = "${dt}" WHERE id = "${req.params.id}"`;
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
