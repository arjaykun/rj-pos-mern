const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const checkAuth = require('../middlewares/checkAuth');

router.post('/register', async (req, res) => {
	const { name, email, password } = req.body;
	const userType = 'superadmin'
	try {
		 if( password.length < 6 ) return res.status(400).json({
		 	msg: "Password must at least 6 characters"
		 })
			
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		const user = await User.create({
			name, email, password: hash, userType,
		})

		if(user) {
			let token = jwt.sign( {
				id: user._id, 
				name: user.name,
				email: user.email,
				password: user.password,
				userType: user.userType
			}, process.env.JWT_TOKEN_SECRET)
			_user = { _id: user._id, name: user.name, email: user.email, userType: user.userType}
			return res.status(200).json({ auth: true, token, user:_user })
		}
	}	catch({message}) {
		res.status(500).json({msg: message})
	}
	

})

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({'email': email});

		if(user) {
			if( await bcrypt.compare(password, user.password) ) {
				let token = jwt.sign( {
					id: user._id, 
					name: user.name,
					email: user.email,
					password: user.password,
					userType: user.userType
				}, process.env.JWT_TOKEN_SECRET)

				_user = { _id: user._id, name: user.name, email: user.email, userType: user.userType}
				return res.status(200).json({ auth: true, token, user: _user })
			} 
		} 
			
		res.status(500).json({msg: "Invalid Credentials"})
	 } catch(error) {
		res.status(500).json({msg: "Something went wrong!"})
	 }
})

router.get('/user', checkAuth, (req, res) => {
	res.json({user: req.user})
})

module.exports = router