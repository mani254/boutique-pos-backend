const express = require('express')
const router = express.Router();
const categoryController = require('../controllers/categoryController.js')


router.post('/', categoryController.addCategory)
router.get('/', categoryController.getCategories)
router.delete('/:id', categoryController.deleteCategory)
router.put('/:id', categoryController.updateCategory);

module.exports = router