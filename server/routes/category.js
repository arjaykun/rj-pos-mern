const express = require('express')
const router = express.Router()
const { isAdmin } = require('../middlewares/checkRole')
const { getCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/categories')

router.route('/')
	.get(getCategories)
	.post( isAdmin, addCategory)

router
	.route('/:id')
	.patch(isAdmin, updateCategory)
	.delete(isAdmin, deleteCategory);


module.exports = router
