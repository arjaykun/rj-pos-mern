const Order = require('../models/order')
const moment = require('moment')

exports.getSales = async (req, res) => {
	const { day_limit, month_limit } = req.query
	// this will return monthly sales 
	// daily sales with limit of 7 days
	try {
		const result = await Order.aggregate()
			.match({completed: true, shop_id: req.user.shop.shop_id})
			.facet({
				yearly: [
					{
						$group: {
							_id: {
								year: { $year: '$createdAt' },
							},
							sales: {$sum: '$total'},			
				 			order_count: {$sum: 1}
						}
					},
					{ $sort: { '_id.year': -1} }
				],
				monthly: [
					{							$group: {
							_id: {
								year: { $year: '$createdAt' },
				 				month: { $month: '$createdAt' },
							},
							sales: {$sum: '$total'},			
				 			order_count: {$sum: 1}
						}
					},
				 	{ $limit: month_limit || 12 },
				 	{ $sort: { '_id.year': -1, '_id.month': -1}}
				],

				daily: [
					{ 
						$group: {
				 			_id: {
				 				year: { $year: '$createdAt' },
				 				month: { $month: '$createdAt' },
				 				day: { $dayOfMonth: '$createdAt' },
				 			}, 
				 			sales: {$sum: '$total'},			
				 			order_count: {$sum: 1}
				 		},
				 	},
				 	{ $limit: day_limit || 7 },
				 	{ $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1}}
				]
		})

		const start = moment().startOf('day')
		const end = moment().endOf('day')
		const today = await Order.aggregate()
			.match({
				completed: true, 
				shop_id: req.user.shop.shop_id, 
				createdAt: { $gte: new Date(Date.parse(start)), $lte: new Date(Date.parse(end))  }
			})
			.group({
				 			_id: {
				 				year: { $year: '$createdAt' },
				 				month: { $month: '$createdAt' },
				 				day: { $dayOfMonth: '$createdAt' },
				 			}, 
				 			sales: {$sum: '$total'},			
				 			order_count: {$sum: 1}
				 		})

		return res.json({ today:today[0], ...result[0]})
	} catch({message}) {
		return res.status(500).json({msg: message})
	} 			
}