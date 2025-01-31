var express = require("express");
var router = express.Router();
var answerController = require("../controllers/answerController");

router.get("/", answerController.index);
router.post("/store", answerController.store);
router.get("/:id/edit", answerController.edit);
router.put("/:id/update", answerController.update);
router.delete("/:id/destroy", answerController.destroy);

module.exports = router;
