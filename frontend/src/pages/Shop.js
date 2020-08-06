import React, { useEffect, useState } from 'react';
import ItemBox from '../components/shop/ItemBox';
import CategoryList from '../components/shop/CategoryList';
import Loading from '../components/utils/Loading';
import ItemSearchInput from '../components/items/ItemSearchInput';
import Modal from '../components/utils/Modal';
import Cart from '../components/shop/Cart';
import { connect } from 'react-redux';
import { getItems } from '../actions/items';
import { MdShoppingCart } from 'react-icons/md';
const Shop = ({items, categories, loading, getItems}) => {
	
	const [showCart, setShowCart] = useState(false);

	useEffect( ()=> {
		if(items.length === 0) {
			getItems()
		}

		//eslint-disable-next-line
	}, [])

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
					<div className="flex">
						<div className="flex flex-col w-24 p-2">
							<CategoryList categories={categories} />
						</div>
						<div className="grid grid-cols-3 gap-1 flex-grow bg-gray-300 p-2 rounded-lg">
						{items.map( item => (
							<ItemBox item={item} key={item._id} />
						))}
						</div>
					</div>
				</div>
			}
		</div>
	)
}

const mapStateToProps = state => ({	
	items: state.items.items,
	categories: state.items.categories,
	loading: state.items.loading,
})

const mapDispatchToProps =  {
	getItems,
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)