import React, { useEffect, useState } from 'react';
import ItemBox from '../components/shop/ItemBox';
import CategoryBox from '../components/shop/CategoryBox';
import Loading from '../components/utils/Loading';
import ItemSearchInput from '../components/items/ItemSearchInput';
import Modal from '../components/utils/Modal';
import Cart from '../components/shop/Cart';
import { connect } from 'react-redux';
import { getShopItems, getAllItems } from '../actions/shop';
import { MdShoppingCart } from 'react-icons/md';

const Shop = ({loading, getShopItems, categories, allItems, getAllItems}) => {
	
	const [showCart, setShowCart] = useState(false);
	const [items, setItems] = useState([]);
	const [colors, setColors] = useState({})
	useEffect( ()=> {
		if(categories.length === 0) {		
			getAllItems()
			getShopItems()
		}
		getColors()
		//eslint-disable-next-line
	}, [categories])


	const getColors = () => {
		const output = {}
		categories.forEach( category => {
			output[category.name] = category.color
		})
		setColors(output);
	}

	const selectCategory = categoryId => {
		if(categoryId !== 1) {
			const select = categories.find( category => category._id === categoryId)
			setItems(select.items);
			return;
		}
		setItems(allItems)
	}

	return (
		<div className="px-2">
			<Modal show={showCart} hideModal={ () => setShowCart(false)} >
				<Cart hideModal={ () => setShowCart(false)} />
			</Modal>
			{
			loading ? 
				<Loading />
			:
				<div className="py-2">
					<div 
						className="relative rounded-lg bg-blue-900 p-2">
						<h1 className="text-4xl font-bold text-white pt-2 ml-1">&#8369; 0.00</h1>
						<span 
							className="absolute top-0 left-0 font-extrabold text-red-700 py-2 px-3 text-base uppercase"
						>
						total
						</span>
					</div>
					<div className="flex items-center">
						<div className="flex-grow mr-2"><ItemSearchInput /></div>
						<button 
							className="w-1/12 rounded-full flex items-center justify-center bg-red-500 h-10 w-12"
							onClick={ () => setShowCart(true)}
						>
							<MdShoppingCart className="text-white" />
						</button>
					</div>
					<div className="flex items-center justify-center flex-wrap">
						<CategoryBox category={{name: 'all',_id:1, color:"gray"}} selectCategory={selectCategory} />
						{
							categories.map( category => (
								<CategoryBox category={category} key={category._id} selectCategory={selectCategory} />
							))
						}			
					</div>
					{
						items.length > 0 ?
							<div className="grid grid-cols-3 py-2">
							{	
								items.map( item => (
									<ItemBox item={item} key={item._id} color={colors[item.category]} />
								))		
							}
							</div>
						:
							<div className="text-center text-2xl flex h-64 justify-center items-center font-bold bg-red-200">Select Category to Start!</div>
					}
					
				</div>
			}
		</div>
	)
}

const mapStateToProps = state => ({	
	loading: state.shop.loading,
	categories: state.shop.categories,
	allItems: state.shop.allItems,
})

const mapDispatchToProps =  {
	getShopItems, getAllItems
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)