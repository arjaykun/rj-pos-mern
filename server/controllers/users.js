const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { pagination } = require('../helpers/pagination')

exports.getUsers = async (req, res) => {
	try {
		//get pagination queries and options
		const { query, options } = pagination(req.query);
		//get users by shop then paginate it and return is a response 
		const users = await User.where({'shop.shop_id': req.shop.shop_id}).paginate(query, options);
		return res.json(users)
	} catch(error) {
		return res.status(500).json({ msg: 'Sorry, Something went wrong!'})
	}
}

exports.addUser = async (req, res) => {
	try { 
		const { name, email, password, userType } = req.body;
		// if the request userType is admin/ superadmin and the logged user is not a superadmin
		// return a unauthorized action message 
	  if( (userType === 'admin' || userType === 'superadmin') && req.user.userType !== 'superadmin') {
	  	return res.status(403).json( { msg: 'Unauthorized Action '})
	  }
	  // return error if password is less than 6 characters
		if( password.length < 6 ) return res.status(400).json({ 
			msg: 'User validation failed: Password must be at lest 6 charactes'
		})
		// hashed password
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		// get shop from req
		const shop = req.user.shop
		console.log(shop)
		//creater user then return it as a response
		const user = await User.create({ name, email, password: hash, userType});
		res.status(201).json({ msg: 'User created', user})
	} catch({message}) {
		res.status(400).json({ msg: message })
	}
 		
}