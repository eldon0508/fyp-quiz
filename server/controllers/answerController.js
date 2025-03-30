const db = require("../database");

const index = async (req, res) => {
  const selectQuery =
    "SELECT a.*, q.question_text as question_name FROM answers a LEFT JOIN questions q ON a.question_id = q.id WHERE a.deleted_at IS NULL";
  const data = await db.query(selectQuery);
  return res.status(200).json({ data: data });
};

const store = async (req, res) => {
  try {
    const { question_id, answer_text, rate, best_answer } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const insertQuery =
      "INSERT INTO answers (question_id, answer_text, rate, best_answer, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)";

    await db.query(insertQuery, [question_id, answer_text, rate, best_answer, dt, dt]);
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("Answer insert error:", err);
    return res.status(500).json({ success: false });
  }
};

const edit = async (req, res) => {
  const selectQuery = "SELECT * FROM answers WHERE id = $1";
  const data = await db.query(selectQuery, [req.params.id]);
  return res.status(200).json({ data: data[0] });
};

const update = async (req, res) => {
  try {
    const { question_id, answer_text, rate, best_answer } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const updateQuery =
      "UPDATE answers SET question_id = $1, answer_text = $2, rate = $3, best_answer = $4, updated_at = $5 WHERE id = $6";

    await db.query(updateQuery, [question_id, answer_text, rate, best_answer, dt, req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Answer update error:", err);
    return res.status(500).json({ success: false });
  }
};

const destroy = async (req, res) => {
  try {
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const destroyQuery = `UPDATE answers SET deleted_at = $1 WHERE id = $2`;
    await db.query(destroyQuery, [dt, req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Answer destroy error:", err);
    return res.status(500).json({ success: false });
  }
};

module.exports = { index, store, edit, update, destroy };
