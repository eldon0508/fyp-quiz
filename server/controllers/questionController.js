const db = require("../database");

const index = async (req, res) => {
  const selectQuery = "SELECT * FROM questions WHERE deleted_at IS NULL";
  const data = await db.query(selectQuery);
  return res.status(200).json({ data: data });
};

const store = async (req, res) => {
  try {
    const { question_text, feedback } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const insertQuery =
      "INSERT INTO questions (question_text, feedback, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING id";

    const result = await db.query(insertQuery, [question_text, feedback, dt, dt]);
    return res.status(201).json({ success: true, result: result[0] });
  } catch (err) {
    console.error("Question store error:", err);
    return res.status(500).json({ success: false });
  }
};

const edit = async (req, res) => {
  const selectQuery = "SELECT * FROM questions WHERE id = $1";
  const searchQuery = "SELECT * FROM answers WHERE question_id = $1 AND deleted_at IS NULL";
  const data = await db.query(selectQuery, [req.params.id]);
  const answers = await db.query(searchQuery, [req.params.id]);
  return res.json({ data: data[0], answers: answers });
};

const update = async (req, res) => {
  try {
    const { question_text, feedback } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const updateQuery = "UPDATE questions SET question_text = $1, feedback = $2, updated_at = $3 WHERE id = $4";

    await db.query(updateQuery, [question_text, feedback, dt, req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Question update error:", err);
    return res.status(500).json({ success: false });
  }
};

const destroy = async (req, res) => {
  try {
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const destroyQuery = `UPDATE questions SET deleted_at = $1 WHERE id = $2`;
    await db.query(destroyQuery, [dt, req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Question destroy error:", err);
    return res.status(500).json({ success: false });
  }
};

module.exports = { index, store, edit, update, destroy };
