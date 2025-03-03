var express = require("express");
var router = express.Router();
var questionController = require("../controllers/questionController");

router.get("/", questionController.index);
router.post("/store", questionController.store);
router.get("/:id/edit", questionController.edit);
router.put("/:id/update", questionController.update);
router.delete("/:id/destroy", questionController.destroy);

module.exports = router;
