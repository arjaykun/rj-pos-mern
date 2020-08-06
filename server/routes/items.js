const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const { pagination } = require('../helpers/pagination');
const { isAdmin } = require('../middlewares/checkRole');

router
	.route('/')
	.get(async (req, res) => {
		
		const { query, options } = pagination(req.query);

		try {
			const items = await Item.paginate(query, options)

			if(items.data.length === 0) {
				return res.status(404).json({ msg: "Page not found." })
			}

			return res.json({...items})
		} catch(err) {
			return res.status(500).json({msg: 'Sorry, Something went wrong!'})
		}

	})
	.post(isAdmin, async (req, res) => {
		const {name, price, category} = req.body; 
		
		try {
			const item = await Item.create({name, price, category})

			if(item) {
				res.status(201).json({ msg: "Item created", item })
			}
		} catch({ message }) {
			res.status(400).json({ msg: message })
		}
		
	}) 
	
router
	.route('/:id')
	.get(isAdmin, async (req, res) => {

		try {
			const item = await Item.findOne({_id:req.params.id})

			return res.status(200).json({
				data: {
					_id: item.id,
					name: item.name,
					price: item.price,
					category: item.category
				}
			})

		} catch(error) {
			res.status(404).json({ msg: 'Item not found'})
		}
	
		
	})
	.patch(isAdmin, async (req, res) => {
		const {name, price, category} = req.body
		const option = {omitUndefined:true, runValidators: true};

		try {

			const item = await Item.updateOne({_id:req.params.id}, {
				 $set: {name, price, category} }, option)
				
			res.status(200).json({msg: "Item updated"})

		} catch({message}) {
			res.status(500).json({ msg: message})
		} 
	
	}) 
	.delete(isAdmin, async (req, res) => {

		try {
			await Item.deleteOne({_id:req.params.id})

		  res.status(200).json( {message: "Item deleted" });

		}	catch(error) {
			res.status(500).json({ msg: 'Sorry, something went wrong!'})
		}
	})


module.exports = router;