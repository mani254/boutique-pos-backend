const express = require('express')
const router = express.Router();
const categoryController = require('../controllers/categoryController.js')
const { authorization } = require('../middleware/authorization.js')

router.post('/', authorization, categoryController.addCategory)
router.get('/', authorization, categoryController.getCategories)
router.delete('/:id', authorization, categoryController.deleteCategory)
router.put('/:id', authorization, categoryController.updateCategory);

module.exports = router