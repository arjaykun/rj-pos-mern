const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const { register, login, updateUserInfo } = require('../controllers/auth')

router.post('/register', register)

router.patch('/update/:id', checkAuth, updateUserInfo)

router.post('/login', login)

router.get('/user', checkAuth, (req, res) => {
	res.json({user: req.user})
})

module.exports = router