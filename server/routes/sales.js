const express = require('express')
const router = express.Router();
const { isAdmin } = require ('../middlewares/checkRole')
const { getSales } = require('../controllers/sales')
router
	.get('/', getSales)

	module.exports =  router