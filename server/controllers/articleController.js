const db = require("../database");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

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
      authors: req.body.authors,
      url: req.body.url,
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
    return res.status(500).json({ success: false });
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
      authors: req.body.authors,
      url: req.body.url,
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
    return res.status(500).json({ success: false });
  }
};

const upload = (req, res) => {
  db.beginTransaction();

  try {
    console.log(req.files, "ababab", req.body);
    var storeDir = "/images/articles",
      dir = path.dirname(__dirname) + "/public" + storeDir;

    // If './public/images/products' not exist, create one
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Retrieve image information and generate new name
    var image = req.files.image,
      ext = path.extname(image.name),
      oldName = image.name,
      newName = uuidv4() + ext,
      uploadPath = dir + "/" + newName,
      storePath = storeDir + "/" + newName;

    // Use the mv() method to place the file somewhere on your server
    image.mv(uploadPath);

    // Finish uploading and rename to unique filename
    fs.rename(dir + "/" + oldName, dir + "/" + newName, () => {});

    const q2 = {
      image: storePath,
      image_extension: ext,
    };

    const query = `UPDATE articles SET ? WHERE id = "${req.params.id}"`;
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
    const d = new Date();
    const dt = d.toISOString().replace("T", " ").substring(0, 19);
    query = `UPDATE articles SET deleted_at = "${dt}" WHERE id = "${req.params.id}"`;
    db.query(query);
    db.commit();
    return res.json({ success: true });
  } catch (err) {
    db.rollback();
    console.error(err);
    return res.status(500).json({ success: false });
  }
};

module.exports = { index, create, store, edit, update, upload, destroy };
