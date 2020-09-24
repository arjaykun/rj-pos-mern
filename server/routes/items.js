const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/checkRole')
const { getItems, addItem, updateItem, deleteItem } = require('../controllers/items') 

router
	.route('/')
	.get(getItems)
	.post(isAdmin, addItem) 
	
router
	.route('/:id')
	.patch(isAdmin, updateItem) 
	.delete(isAdmin, deleteItem)


module.exports = router;