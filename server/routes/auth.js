const express = require('express');

const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
	const { name, email, password, userType } = req.body;


	if( password.length < 6 ) return res.status(400).json({
		error: {
			message: "Password must at least 6 characters"
		}
	})
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	const user = await User.create({
		name, email, password: hash, userType,
	}).catch( error => { return res.status(400).json({error}) })

	if(user) {
		let token = jwt.sign( {
			id: user._id, 
			name: user.name,
			email: user.email,
			password: user.password,
			userType: user.userType
		}, process.env.JWT_TOKEN_SECRET)

		return res.status(200).json({ auth: true, token })
	}

})

router.post('/login', async (req, res) => {

	const { email, password } = req.body;

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

		return res.status(200).json({ auth: true, token })
		} 
	} 
	
	res.json({msg: "Invalid Credentials"})
	

})

module.exports = router