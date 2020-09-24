const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { pagination } = require('../helpers/pagination')

exports.getUsers = async (req, res) => {
	 try {
		// get pagination queries and options
		const { query, options } = pagination(req.query);
		//get users by shop then paginate it and return is a response 
		const users = await User.paginate(
			{
				...query, 
				'shop.shop_id': req.user.shop.shop_id,
				'_id': { $ne :req.user._id},
			}, 
			{	
				...options, 
				select: "_id name email userType" 
			}
		);

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
		// if( password.length < 6 ) return res.status(400).json({ 
		// 	msg: 'User validation failed: Password must be at lest 6 charactes'
		// })
		// hashed password
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		// get shop from req
		const shop = req.user.shop
		//creater user then return it as a response
		const user = await User.create({ name, email, password: hash, userType, shop});
		res.status(201).json({ msg: 'User created', user})
	} catch({message}) {
		res.status(400).json({ msg: message })
	}
 		
}

exports.updateUser = async (req, res) => {
	try {
		//get user 
		const user = await User.findOne({_id:req.params.id});

		// return 403 if the fetch is user is admin and the logged in user is not a superadmin
		if(canUpdate(user.userType, req.user.userType))
			return res.status(403).json({ msg: 'Unauthorized Action'})

		// update the user
		else {
			const {name, email, userType} = req.body;
			const option = {omitUndefined:true, runValidators: true};
			await User.updateOne({_id:req.params.id}, {
				$set: { name, email, userType}
			}, option);
			return res.json({ msg: 'User updated.'} )
		}
	
	} catch({message}) {
		res.status(500).json({ msg: message });
	}
}

exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findOne({_id:req.params.id});

		if(canUpdate(user.userType, req.user.userType))
			return res.status(403).json({ msg: 'Unauthorized Action'})

		await User.deleteOne({_id:req.params.id});
		res.json({ msg: 'User deleted.'})
		
	} catch( error) {
		res.status(500).json({ msg: "Sorry, Something went wrong!"})
	}
}

//userType is from fetched user.userType while reqUserType is from req.user.userType
const canUpdate = (userType, reqUserType) => {
	if(userType === 'admin' && reqUserType !== 'superadmin') {
		return false
	} else if(userType === 'superadmin') {
		return false
	return true
	}
}

exports.changePassword = async (req, res) => {
	try {
		const user = await User.findOne({_id:req.params.id});
		if(!canUpdate(user.userType, req.user.userType))
			return res.status(403).json({ msg: 'Unauthorized Action'})

		//change password
		const { password, old_password } = req.body;
		const option = { runValidators: true};
		if( await bcrypt.compare(old_password, user.password) ) {
			// hash password before update
			const salt = bcrypt.genSaltSync(10);
			const hashedPassword = bcrypt.hashSync(password, salt);
			// update password
			await User.updateOne({_id:req.params.id}, {
				$set: { password: hashedPassword }
			}, option);
			return res.json({ msg: 'User password updated.'} )
		} else {
			return res.status(400).json({ msg: 'Wrong password.'} )
		}		
	} catch({message}) {
		res.status(500).json({ msg: message });
	}
}