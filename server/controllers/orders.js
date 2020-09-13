const uniqid = require('uniqid');
const Order = require('../models/order');
const { pagination } = require('../helpers/pagination');


exports.getOrders = async (req, res) => { 
	const { query, options } = pagination(req.query);
	try {
		const orders = await Order.paginate({...query, shop_id:req.user.shop.shop_id }, {...options, select:"_id order_id items discount total received_by payment change dineIn completed createdAt updatedAt"})
		return res.json(orders)

	} catch(error) {
		return res.status(500).json({ msg: "Sorry, Something went wrong!"})
	}
}

exports.addOrder = async (req, res) => {
	try {
		const { items, discount, total, payment, change} = req.body;
		const order = await Order.create({
			items, discount, total, payment, change, 
			order_id:uniqid.process(), 
			received_by: req.user.name,
			shop_id: req.user.shop.shop_id,
		})
		res.status(201).json({msg:"Order is created", data: order})

	} catch(error) {
		return res.status(500).json({ msg: "Sorry, Something went wrong!"})
	}
}

exports.updateOrder = async (req, res) => {
	try {
		const { items, discount, total, payment, change, completed } = req.body;
		const response = await Order.updateOne({_id: req.params.id}, {
			$set: { items, discount, total, payment, change, completed }
		}, {omitUndefined:true, runValidators: true})
		return res.status(201).json({ msg: 'Order upated'})
	}catch(error){
		return res.status(400).json({msg: 'Sorry! Something went wrong!'})
	}
	
}

exports.deleteOrder = async(req, res) => {
	const response = await Order.deleteOne({_id:req.params.id})
		.catch(error => res.status(400).json({ error }))

	if(response.deletedCount > 0) {
		return res.status(201).json({ msg: 'Order deleted'})
	} else {
		return res.status(400).json({msg: 'Sorry! Something went wrong!'})
	}
}