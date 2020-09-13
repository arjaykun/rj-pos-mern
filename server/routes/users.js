const express = require('express')
const router = express.Router()
const { getUsers, addUser }  = require('../controllers/users')
const { isAdmin } = require('../middlewares/checkRole')

router
	.route('/')
	.get( isAdmin, getUsers)
	.post( isAdmin, addUser )

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
				res.status(403).json({ msg: 'Unauthorized Action, you can not delete an admin if you are not a superadmin'})
			} else if(user.userType === 'superadmin') {
				res.status(403).json({ msg: 'Unauthorized Action, you cant remove a superadmin from the userlist'})
			} else {
				await User.deleteOne({_id:req.params.id});
				res.json({ msg: 'User deleted.'})
			}
		} catch( error) {
			res.status(500).json({ msg: "Sorry, Something went wrong!"})
		}
	})

module.exports = router