var express = require("express");
var router = express.Router();
var categoryController = require("../controllers/categoryController");

router.get("/", categoryController.index);
router.post("/store", categoryController.store);
router.get("/:id/edit", categoryController.edit);
router.put("/:id/update", categoryController.update);
router.delete("/:id/destroy", categoryController.destroy);

module.exports = router;
