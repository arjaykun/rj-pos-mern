const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const itemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	  index: true,
    unique: true,
    lowercase: true,
    minlength: 3, 
	},
	price: {
		type:Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
		lowercase: true, 
	},

	shop_id: {
		type: String,
		required: true,
	}
})

itemSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Item', itemSchema);