var express = require("express");
var router = express.Router();
var quizController = require("../controllers/quizController");

router.get("/", quizController.index);
router.post("/store", quizController.store);
router.get("/:id/edit", quizController.edit);
router.put("/:id/update", quizController.update);
router.delete("/:id/destroy", quizController.destroy);

module.exports = router;
