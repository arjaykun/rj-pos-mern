const express = require('express')
const router = express.Router()
const { getUsers, addUser, updateUser, deleteUser, changePassword }  = require('../controllers/users')
const { isAdmin } = require('../middlewares/checkRole')

router
	.route('/')
	.get( isAdmin, getUsers)
	.post( isAdmin, addUser )

router
	.route('/:id')
	.patch( isAdmin, updateUser)
	.delete(isAdmin, deleteUser)

router
	.patch('/:id/change-password', changePassword)

module.exports = router