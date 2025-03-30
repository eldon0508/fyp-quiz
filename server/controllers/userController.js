const db = require("../database");

const index = async (req, res) => {
  const selectQuery = "SELECT * FROM users WHERE role = $1 AND deleted_at IS NULL";
  const data = db.query(selectQuery, [2]);
  return res.status(200).json({ data: data });
};

const edit = async (req, res) => {
  const selectQuery = "SELECT username, firstname, lastname, dob FROM users WHERE id = $1";
  const data = await db.query(selectQuery, [req.params.id]);
  return res.status(200).json({ data: data[0] });
};

const update = async (req, res) => {
  try {
    const { firstname, lastname, username, dob } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const updateQuery =
      "UPDATE users SET firstname = $1, lastname = $2, username = $3, dob = $4, updated_at = $5 WHERE id = $6";

    await db.query(updateQuery, [firstname, lastname, username, dob, dt, req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("User update error:", err);
    return res.status(500).json({ success: false });
  }
};

const destroy = async (req, res) => {
  try {
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const destroyQuery = "UPDATE users SET deleted_at = $1 WHERE id = $2";
    await db.query(destroyQuery, [dt, req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("User destroy error:", err);
    return res.status(500).json({ success: false });
  }
};

module.exports = { index, edit, update, destroy };
