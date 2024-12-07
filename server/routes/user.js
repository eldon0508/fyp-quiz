var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

router.get("/", userController.index);
// router.get("/create", userController.create);
// router.post("/store", userController.store);
router.get("/:id/edit", userController.edit);
router.put("/:id/update", userController.update);
// router.delete("/:id/destroy", userController.destroy);

module.exports = router;