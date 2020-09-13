const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
	name: {
		type: String, 
		required: true,
		lowercase: true,
		match: /[A-Za-z ]/gi,
		minLength: 3,
	},

	shop: {
		shop_id: String,
		name: String,
		address: { type: String, default: "No address given yet."},
		description: { type: String, default: "No description given yet."},
	},

	email: {
		type: String,
		required: true,
		match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		index: true,
    unique: true,
	},

	password: {
		type: String,
		required: true,
		minLength: 6
	}, 

	userType: {
		type: String,
		lowercase: true, 
		default: 'user',
		enum: ['user', 'admin', 'superadmin']
	}
});

userSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('User', userSchema)