const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const { pagination } = require('../helpers/pagination');
const { isAdmin } = require('../middlewares/checkRole');

router
	.route('/')
	.get( isAdmin, async (req, res) => {
		
		const { query, options } = pagination(req.query);

		try {
			
			const users = await User.paginate(query, options);
			return res.json(users)

		} catch(error) {
			return res.status(500).json({ msg: 'Sorry, Something went wrong!'})
		}


	})
	.post( isAdmin, async (req, res) => {

		const { name, email, password, userType } = req.body;

		if( (userType === 'admin' || userType === 'superadmin') && req.user.userType !== 'superadmin') {
			return res.status(403).json( { msg: 'Unauthorized Action '})
		}

		if( password.length < 6 ) return res.status(400).json({ 
			msg: 'User validation failed: Password must be at lest 6 charactes'
		})

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		
		try { 
			const user = await User.create({ name, email, password: hash, userType, });
			res.status(201).json({ msg: 'User created', user})
		} catch({message}) {
			res.status(400).json({ msg: message })
		}
 		
	})

router
	.route('/:id')
	.get( isAdmin, async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.params.id });
			res.json({data: {
				_id: user.id,
				name: user.name,
				email: user.email,
				password: user.password,
				userType: user.userType,
			}})
		} catch(error) {
			res.status(500).json({ msg: "User not found."})
		}
	})

	.patch( isAdmin, async (req, res) => {
		try {
			const user = await User.findOne({_id:req.params.id});
			
			if(user.userType === 'admin' && req.user.userType !== 'superadmin') {
				res.status(403).json({ msg: 'Unauthorized Action'})
			} else if(user.userType === 'superadmin') {
				res.status(403).json({ msg: 'Unauthorized Action'})
			} else {
				const {name, email} = req.body;
				const option = {omitUndefined:true, runValidators: true};
				await User.updateOne({_id:req.params.id}, {
					$set: { name, email}
				}, option);
				return res.json({ msg: 'User updated.'} )
			}
		
		} catch({message}) {
			res.status(500).json({ msg: message });
		}
	})

	.delete(isAdmin, async (req, res) => {
		try {
			const user = await User.findOne({_id:req.params.id});
			if(user.userType === 'admin' && req.user.userType !== 'superadmin') {
				res.status(403).json({ msg: 'Unauthorized Action'})
			} else if(user.userType === 'superadmin') {
				res.status(403).json({ msg: 'Unauthorized Action'})
			} else {
				await User.deleteOne({_id:req.params.id});
				res.json({ msg: 'User deleted.'})
			}
		} catch( error) {
			res.status(500).json({ msg: "Sorry, Something went wrong!"})
		}
	})

module.exports = router