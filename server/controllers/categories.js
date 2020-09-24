const Category = require('../models/category');
const { isAdmin } = require('../middlewares/checkRole');

exports.getCategories = async (req, res) => {
	if(req.query.get === 'all') {
		try {
			const categories = await Category.find({shop_id: req.user.shop.shop_id}).select('_id name color');
			return res.json({data:categories, count:categories.length})
		} catch(error) {
			return res.status(500).json({msg: 'Sorry, Something went wrong!'})
		}
	}

	try {
		const categories = await Category.find({shop_id: req.user.shop.shop_id}).populate({
			"path":"items",
			"match": {shop_id: req.user.shop.shop_id}
		})
		res.status(200).json({
			data: categories.map( cat => ({
							_id: cat.id,
							name: cat.name,
							color: cat.color,
							items: cat.items.map( item => ({
								_id: item.id,
								name: item.name,
								price: item.price,
								category: item.category,
							}))
						})),
			count: categories.length,
		})

	} catch(error) {
		res.status(500).json({ msg: 'Sorry, Something went wrong!'})
	}		
}

exports.addCategory = async (req, res) => {
	try {
		const { name, color } = req.body;
		const result = await Category.create({ name, color, shop_id: req.user.shop.shop_id });
		res.json({ msg: 'Category created.', category: result})
	} catch({message}) {
		res.status(500).json({ msg: message})
	}
}

exports.updateCategory =  async (req,res) => {
	const { name, color } = req.body;
	const option = {omitUndefined:true, runValidators: true};
	try{
		await Category.updateOne({ _id:req.params.id},
			{ $set: {name, color} }, option);
		res.json({ msg: 'Category updated.'})
	} catch({message}) {
		res.status(500).json({ msg: message})
	}
}

exports.deleteCategory =  async (req, res) => {
	try {
		await Category.deleteOne({ _id:req.params.id})
		res.json({ msg: 'Category deleted.'})
	} catch(error) {
		res.status(500).json({ msg: 'Sorry, Something went wrong!'})
	} 
}