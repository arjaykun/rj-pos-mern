const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const orderItemSchema = new mongoose.Schema({
	_id: mongoose.Schema.ObjectId,
	name: String,
	price: Number,
	qty: Number,
	discount: Number,
	subtotal: Number,
}, {_id:false})


const orderSchema = new mongoose.Schema({
	items: [orderItemSchema],
	
	order_id: {
		type: String,
		required: true,
	},
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
	},

	received_by: {
		type: String,
		required: true,
	},

	shop_id: {
		type: String,
		required: true,
	}

}, { timestamps: true})

orderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Order', orderSchema)