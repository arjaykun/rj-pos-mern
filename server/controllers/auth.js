const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uniqid = require('uniqid');

exports.register =  async (req, res) => {
	try {		//get request params & initialize userType as superadmin
		const { name, email, password, shop_name } = req.body;
		const userType = 'superadmin'
		if(password.length < 6) {
			return res.status(400).json({msg: "Invalid password! Must be 6 characters up."})
		}
		//hashed password
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		
		const user = await User.create({
			name, email, password: hash, userType, shop: { name: shop_name, shop_id: uniqid.process() }
		})
		//get token from created user then passed it as a response to log in.
		if(user) {
			let token = jwt.sign( {
				_id: user._id, 
				name: user.name,
				email: user.email,
				password: user.password,
				userType: user.userType,
				shop: user.shop
			}, process.env.JWT_TOKEN_SECRET)
				// re-declare user object that we want to return as a response
			_user = { _id: user._id, name: user.name, email: user.email, userType: user.userType, shop: user.shop}
			return res.status(200).json({ auth: true, token, user:_user })
		}
	}	catch({message}) {
		res.status(500).json({msg: message})
	}
}

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		// get the user by email or null if does not exist 
		const user = await User.findOne({'email': email});
		// check if the user password is correct then log in the user with a token
		if(user) {
			if( await bcrypt.compare(password, user.password) ) {
				let token = jwt.sign( {
					_id: user._id, 
					name: user.name,
					email: user.email,
					shop: user.shop,
					password: user.password,
					userType: user.userType,
					shop: user.shop
				}, process.env.JWT_TOKEN_SECRET)
				// re-declare user object that we want to return as a response
				_user = { _id: user._id, name: user.name, email: user.email, userType: user.userType, shop: user.shop}
				return res.status(200).json({ auth: true, token, user: _user })
			} 
		} 
		//return if user does not exit or given a wrong password
		res.status(500).json({msg: "Invalid Credentials"})
	 } catch(error) {
		res.status(500).json({msg: "Something went wrong!"})
	 }
}

exports.updateUserInfo = async (req, res) => {
	try {
		const user = await User.findOne({_id: req.params.id})
		const {name, email, shop, password} = req.body;

		if( await bcrypt.compare(password, user.password) ) {
			const option = {omitUndefined:true, runValidators: true};
			await User.updateOne({_id:req.params.id}, {
				$set: { name, email, shop }
			}, option);
			return res.json({ msg: 'User updated.'} )
		} else {
			res.status(400).json({ msg: 'Wrong password.' });
		}
	} catch({message}){
		res.status(500).json({ msg: message });
	}
}

exports.getUser = async (req, res) => {
	try {
		const id = req.user._id
	  const user = await User.findOne({_id:id});
	  res.json({user});
	} catch(error) {
		console.log(error)
		 res.status(500).json({msg: "Something went wrong!"})
	}
}