const Item = require('../models/item')
const { pagination } = require('../helpers/pagination')

exports.getItems = async (req, res) => {
	const shop_id = req.user.shop.shop_id
	if(req.query.get === 'all') {
		try {
			const items = await Item.find({shop_id}).select("_id name price category");
			return res.json({data:items, count:items.length})
		} catch(error) {
			return res.status(500).json({msg: 'Sorry, Something went wrong!'})
		}
	}

	try {
		const { query, options } = pagination(req.query);
		const items = await Item.paginate({...query, shop_id }, {...options, select:"_id name price category"})

		return res.json({...items})
	} catch(err) {
		return res.status(500).json({msg: 'Sorry, Something went wrong!'})
	}

}

exports.addItem = async (req, res) => {
	try {
	const {name, price, category} = req.body; 
		const item = await Item.create({name, price, category, shop_id: req.user.shop.shop_id})
		res.status(201).json({ msg: "Item created", item })
	} catch({ message }) {
		res.status(400).json({ msg: message })
	}
}

exports.updateItem = async (req, res) => {
	const {name, price, category} = req.body
	const option = {omitUndefined:true, runValidators: true};

	try {

		const item = await Item.updateOne({_id:req.params.id}, {
			 $set: {name, price, category} }, option)
			
		res.status(200).json({msg: "Item updated"})

	} catch({message}) {
		res.status(500).json({ msg: message})
	} 

}

exports.deleteItem =  async (req, res) => {
	try {
		await Item.deleteOne({_id:req.params.id})
	  res.status(200).json( {message: "Item deleted" });
	}	catch(error) {
		res.status(500).json({ msg: 'Sorry, something went wrong!'})
	}
}