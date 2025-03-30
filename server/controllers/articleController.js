const db = require("../database");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const index = async (req, res) => {
  const selectQuery =
    "SELECT a.*, c.name as category_name FROM articles a LEFT JOIN categories c ON a.category_id = c.id WHERE a.deleted_at IS NULL";
  const data = await db.query(selectQuery);
  return res.status(200).json({ data: data });
};

const create = async (req, res) => {
  const selectQuery = "SELECT id, name FROM categories WHERE deleted_at IS NULL";
  const data = await db.query(selectQuery);
  return res.json({ categories: data });
};

const store = async (req, res) => {
  try {
    const { category_id, title, subtitle, authors, url, published, content } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const insertQuery =
      "INSERT INTO articles (category_id, title, subtitle, authors, url, published, content, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

    await db.query(insertQuery, [category_id, title, subtitle, authors, url, published, content, dt, dt]);
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("Article store error:", err);
    return res.status(500).json({ success: false });
  }
};

const edit = async (req, res) => {
  const selectQuery = "SELECT * FROM articles WHERE id = $1";
  const selectQuery2 = "SELECT id, name FROM categories WHERE deleted_at IS NULL";
  const data = await db.query(selectQuery, [req.params.id]);
  const categories = await db.query(selectQuery2);
  return res.json({ data: data[0], categories: categories });
};

const update = async (req, res) => {
  try {
    const { category_id, title, subtitle, authors, url, published, content } = req.body;
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const updateQuery =
      "UPDATE articles SET category_id = $1, title = $2, subtitle = $3, authors = $4, url = $5, published = $6, content = $7, updated_at = $8 WHERE id = $9";

    await db.query(updateQuery, [category_id, title, subtitle, authors, url, published, content, dt, req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Article update error:", err);
    return res.status(500).json({ success: false });
  }
};

const upload = async (req, res) => {
  try {
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

    const updateQuery = "UPDATE articles SET image = $1, image_extension = $2 WHERE id = $3";
    await db.query(updateQuery, [storePath, ext, req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Article upload error:", err);
    return res.status(500).json({ success: false });
  }
};

const destroy = async (req, res) => {
  try {
    const dt = new Date().toISOString().replace("T", " ").substring(0, 19);
    const destroyQuery = "UPDATE articles SET deleted_at = $1 WHERE id = $2";
    db.query(destroyQuery, [dt, req.params.id]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Article destroy error:", err);
    return res.status(500).json({ success: false });
  }
};

module.exports = { index, create, store, edit, update, upload, destroy };
