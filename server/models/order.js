const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const orderItemSchema = new mongoose.Schema({
	item: { type: mongoose.ObjectId, ref: "Item"},
	qty: Number,
	discount: Number,
	subtotal: Number,
}, {_id:false})


const orderSchema = new mongoose.Schema({
	items: [orderItemSchema],
	
	payment: {
		type: Number,
		required: true,
	},

	change: {
		type: Number,
		required: true,
	},
	
	discount: {
		type: Number,
		required: true,
		default: 0, 
	},

	total: {
		type: Number,
		required: true,
	},

	dineIn: {
		type: Boolean,
		default: true,
	},

	completed: {
		type: Boolean,
		default: false,
	}

}, { timestamps: true})

orderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Order', orderSchema)