const express = require('express')
const router = express.Router();
const { isAdmin } = require ('../middlewares/checkRole')
const { getOrders, addOrder, updateOrder, deleteOrder } = require('../controllers/orders')

router
	.route('/', isAdmin)
	.get(getOrders)
	.post(addOrder)

router
	.route('/:id', isAdmin)
	.patch(updateOrder)
	.delete(deleteOrder)


module.exports = router;