import React from 'react';
import { connect } from 'react-redux';
import { addItemInCart} from '../../actions/cart';

const ItemBox = ({item, addItemInCart}) => {
	
	const handleAdd = () => {
		console.log(item)
		addItemInCart(item)
	}

	return (
		<button
			onClick={ handleAdd } 
			className="p-3 flex flex-col justify-center h-24 items-center bg-red-700 rounded-lg">
			<h1 className="text-base font-bold text-white">{item.name}</h1>
			<span className="text-sm text-gray-300">P{item.price}</span>
		</button>
	)
}

export default connect(null, { addItemInCart })(ItemBox)