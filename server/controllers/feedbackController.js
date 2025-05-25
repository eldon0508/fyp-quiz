const db = require("../database");

const index = async (req, res) => {
  const selectQuery =
    "SELECT qf.id, qf.feedback, qf.created_at, qf.quiz_id, q.name as quiz_name FROM quiz_feedbacks qf LEFT JOIN quizzes q ON qf.quiz_id = q.id WHERE qf.deleted_at IS NULL";
  const data = await db.query(selectQuery);
  return res.status(200).json({ data: data });
};

const destroy = async (req, res) => {
  try {
    const destroyQuery = "UPDATE quiz_feedbacks SET deleted_at = NOW() WHERE id = $1";
    await db.query(destroyQuery, [req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Category destroy error:", err);
    return res.status(500).json({ success: false });
  }
};

module.exports = { index, destroy };
