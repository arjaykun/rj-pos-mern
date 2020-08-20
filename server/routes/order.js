const express = require('express')
const router = express.Router();

const Order = require('../models/order');
const { pagination } = require('../helpers/pagination');
const { isAdmin } = require ('../middlewares/checkRole')

router.route('/')
	.get(async (req, res) => { 

	const { query, options } = pagination(req.query);

	try {
		const orders = await Order.paginate(query, options)
		return res.json(orders)

	} catch(error) {
		return res.status(500).json({ msg: "Sorry, Something went wrong!"})
	}


	})
	.post(async (req, res) => {
		const { items, discount, total, payment, change} = req.body;

		const order = await Order.create({
			items, discount, total, payment, change
		}).catch( error => {
			return res.status(500).json({ msg: "Sorry, Something went wrong!"})
		})


		if(order) {	
			res.status(201).json({msg:"Order is created", data: order})
		}

	})

router
	.route('/:id')
	.get(isAdmin,  async (req, res) => {
		const order = await Order.findById(req.params.id)
														.populate('items.item')
														.catch(error => res.status(400).json({error}))

		if(order) {
			return res.status(200).json({
				orders: {
					_id: order.id,
					items: order.items.map(doc => ({
						item: {
							_id: doc.item.id,
							name: doc.item.name,
							price: doc.item.price,
							category: doc.item.category
						},
						qty: doc.qty,
						subtotal: doc.subtotal,
					})),
					discount: order.discount,
					total: order.total,
					createdAt: order.createdAt,
					upatedAt: order.upatedAt
				}
			})
		} 

		res.status(404).json({
			msg: "Order not found",
		})
		
	})
	.patch(isAdmin, async (req, res) => {
		const { items, discount, total } = req.body;

		const response = await Order.updateOne({_id: req.params.id}, {
			$set: { items, discount, total, payment, change }
		}, {omitUndefined:true}).catch(error => res.status(400).json({error}))

		if(response) {
			return res.status(201).json({ msg: 'Order upated'})
		} else {
			return res.status(400).json({msg: 'Sorry! Something went wrong!'})
		}
	})
	.delete(isAdmin, async(req, res) => {
		const response = await Order.deleteOne({_id:req.params.id})
			.catch(error => res.status(400).json({ error }))

		if(response.deletedCount > 0) {
			return res.status(201).json({ msg: 'Order deleted'})
		} else {
			return res.status(400).json({msg: 'Sorry! Something went wrong!'})
		}
	})

module.exports = router;