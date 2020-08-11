import React, { useEffect, useState } from 'react';
import ItemBox from '../components/shop/ItemBox';
import Loading from '../components/utils/Loading';
import ItemSearchInput from '../components/items/ItemSearchInput';
import Modal from '../components/utils/Modal';
import Cart from '../components/shop/Cart';
import { connect } from 'react-redux';
import { getShopItems } from '../actions/shop';
import { MdShoppingCart } from 'react-icons/md';

const Shop = ({loading, getShopItems, categories}) => {
	
	const [showCart, setShowCart] = useState(false);
	const [items, setItems] = useState([]);

	useEffect( ()=> {
		if(categories.length === 0)
			getShopItems()
		//eslint-disable-next-line
	}, [])

	const selectCategory = categoryId => {
		const select = categories.find( category => category._id === categoryId)
		setItems(select.items);
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
						{
							categories.map( category => (
								<div
								 className={`w-24 h-12 uppercase font-bold text-xs bg-${category.color !== 'black'? category.color : 'gray'}-700 text-white flex justify-center items-center flex-grow cursor-pointer hover:bg-${category.color}-500`}
								 onClick={() => selectCategory(category._id)}
								 key={category._id}
								 >
								 	{category.name}

								</div>
							))
						}			
					</div>
					<div className="flex items-center justify-center flex-wrap">
					{
						items.map( item => (
							<ItemBox item={item} key={item._id} />
						))		
					}
					</div>
				</div>
			}
		</div>
	)
}

const mapStateToProps = state => ({	
	loading: state.shop.loading,
	categories: state.shop.categories
})

const mapDispatchToProps =  {
	getShopItems
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)