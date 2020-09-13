const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		lowercase: true, 
	},
	
	color: {
		type: String,
		lowercase: true, 
		enum: ['red', 'green', 'yellow', 'blue', 'gray', 'teal', 'indigo', 'purple', 'pink', 'orange']
	},

	shop_id: {
		type: String,
		required: true,
	}
})

categorySchema.virtual('items', {
	ref: "Item",
	localField: "name",
	foreignField: "category",
	options: { sort: { name: 1 }}
})

module.exports = mongoose.model('Category', categorySchema)