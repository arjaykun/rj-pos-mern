const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		lowercase: true, 
	},
	
	color: {
		type: String,
		default: 'black',
		lowercase: true, 
		enum: ['black', 'red', 'green', 'yellow', 'blue', 'gray', 'skyblue']
	}
})

categorySchema.virtual('items', {
	ref: "Item",
	localField: "name",
	foreignField: "category",
	options: { sort: { name: 1 }}
})

module.exports = mongoose.model('Category', categorySchema)