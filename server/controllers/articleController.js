const db = require("../database");

const index = (req, res) => {
  const query = `
  SELECT a.*, c.name as category_name
  FROM articles a
  LEFT JOIN categories c
  ON a.category_id = c.id
  WHERE a.deleted_at IS NULL`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ data: data });
  });
};

const create = (req, res) => {
  const query = `SELECT id, name FROM categories WHERE deleted_at IS NULL`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ categories: data });
  });
};

const store = (req, res) => {
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

    const query = `INSERT articles SET ?`;

    db.query(query, q2);
    db.commit();
    return res.json({ success: true });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500);
  }
};

const edit = (req, res) => {
  const query = `SELECT * FROM articles WHERE id = ${req.params.id}; SELECT id, name FROM categories WHERE deleted_at IS NULL`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json({ data: data[0][0], categories: data[1] });
  });
};

const update = (req, res) => {
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
};

const destroy = (req, res) => {
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
};

module.exports = { index, create, store, edit, update, destroy };
