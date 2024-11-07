var express = require('express');
var router = express.Router();
var articleController = require('../controllers/articleController');

router.get('/', articleController.index);
router.get('/create', articleController.create);
router.post('/store', articleController.store);
router.get('/:id/edit', articleController.edit);
router.put('/:id/update', articleController.update);
router.delete('/:id/destroy', articleController.destroy);

module.exports = router;