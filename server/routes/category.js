const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const { isAdmin } = require('../middlewares/checkRole');

router.route('/')
	.get(isAdmin, async (req, res) => {

		try {
			const categories = await Category.find().populate('items')

			res.status(200).json({
				data: categories.map( cat => ({
								_id: cat.id,
								name: cat.name,
								color: cat.color,
								items: cat.items.map( item => ({
									_id: item.id,
									name: item.name,
									price: item.price
								}))
							})),
				count: categories.length,
			})

		} catch(error) {
			res.status(500).json({ msg: 'Sorry, Something went wrong!'})
		}		
	})
	.post( isAdmin, async (req, res) => {
		
		try {
			const { name, color } = req.body;
			const result = await Category.create({ name, color });
			res.json({ msg: 'Category created.' })
		} catch({message}) {
			res.status(500).json({ msg: message})
		}

	})

router
	.route('/:id')
	.get(isAdmin, async (req,res) => {

		try {
			const categories = await Category.findOne({_id:req.params.id}).populate('items')

			res.status(200).json({
				categories: {
					_id: categories.id,
					name: categories.name,
					color: categories.color,
					items: categories.items.map( item => ({
						_id: item.id,
						name: item.name,
						price: item.price
					}))
				}
			})

		} catch(error) {
			res.status(500).json({ msg: 'Category not found.'})
		}			
	})
	.patch(isAdmin, async (req,res) => {
		const { name, color } = req.body;
		const option = {omitUndefined:true};
		try{
			await Category.updateOne({ _id:req.params.id},
				{ $set: {name, color} }, option);
			res.json({ msg: 'Category updated.'})
		} catch({message}) {
			res.status(500).json({ msg: message})
		}
	})
	.delete(isAdmin, async (req, res) => {
		try {
			await Category.deleteOne({ _id:req.params.id})
			res.json({ msg: 'Category deleted.'})
		} catch(error) {
			res.status(500).json({ msg: 'Sorry, Something went wrong!'})
		} 
	});


module.exports = router
