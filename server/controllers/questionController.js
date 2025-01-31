const db = require("../database");

const index = (req, res) => {
  const query = `SELECT q.*, qu.name as quiz_name
      FROM questions q
      LEFT JOIN quizzes qu
      ON q.quiz_id = qu.id
      WHERE q.deleted_at IS NULL`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ data: data });
  });
};

const create = (req, res) => {
  const query = `SELECT id, name FROM quizzes WHERE deleted_at IS NULL`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ quizzes: data });
  });
};

const store = (req, res) => {
  db.beginTransaction();

  try {
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const q2 = {
      quiz_id: req.body.quiz_id,
      question_text: req.body.question_text,
      feedback: req.body.feedback,
      created_at: dt,
      updated_at: dt,
    };

    const query = `INSERT questions SET ?`;

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
  const query = `SELECT * FROM questions WHERE id = ${req.params.id};
        SELECT id, name FROM quizzes WHERE deleted_at IS NULL;
        SELECT * FROM answers WHERE question_id = ${req.params.id} AND deleted_at IS NULL`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ data: data[0][0], quizzes: data[1], answers: data[2] });
  });
};

const update = (req, res) => {
  db.beginTransaction();

  try {
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const q2 = {
      quiz_id: req.body.quiz_id,
      question_text: req.body.question_text,
      feedback: req.body.feedback,
      updated_at: dt,
    };
    const query = `UPDATE questions SET ? WHERE id = "${req.params.id}"`;

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
    query = `UPDATE questions SET deleted_at = "${dt}" WHERE id = "${req.params.id}"`;
    db.query(query);
    db.commit();
    return res.json({ success: true });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false });
  }
};

module.exports = { index, create, store, edit, update, destroy };
