const db = require("../database");

const index = async (req, res) => {
  const selectQuery = "SELECT * FROM categories WHERE deleted_at IS NULL ";
  const data = await db.query(selectQuery);
  return res.status(200).json({ data: data });
};

const store = async (req, res) => {
  try {
    const { name, description } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const insertQuery = "INSERT INTO categories (name, description, created_at, updated_at) VALUES ($1, $2, $3, $4)";

    await db.query(insertQuery, [name, description, dt, dt]);
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("Category store error:", err);
    return res.status(500).json({ success: false });
  }
};

const edit = async (req, res) => {
  const selectQuery = `SELECT * FROM categories WHERE id = $1`;
  const data = await db.query(selectQuery, [req.params.id]);
  return res.json({ data: data[0] });
};

const update = async (req, res) => {
  try {
    const { name, description } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const updateQuery = `UPDATE categories SET name = $1, description = $2, updated_at = $3 WHERE id = $4`;
    await db.query(updateQuery, [name, description, dt, req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Category update error:", err);
    return res.status(500).json({ success: false });
  }
};

const destroy = async (req, res) => {
  try {
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const destroyQuery = `UPDATE categories SET deleted_at = $1 WHERE id = $2`;
    await db.query(destroyQuery, [dt, req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Category destroy error:", err);
    return res.status(500).json({ success: false });
  }
};

module.exports = { index, store, edit, update, destroy };
