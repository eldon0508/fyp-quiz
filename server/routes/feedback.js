var express = require("express");
var router = express.Router();
var feedbackController = require("../controllers/feedbackController");

router.get("/", feedbackController.index);
router.delete("/:id/destroy", feedbackController.destroy);

module.exports = router;
