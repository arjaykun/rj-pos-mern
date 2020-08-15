import React, { useState, useEffect } from 'react';
import { MdClose, MdRemove } from 'react-icons/md';
const CartItem = ({item, removeItem, changeQty}) => {

	const [qty, setQty] = useState(0);

	useEffect( () => {
		setQty(item.qty)
	}, [item.qty])

	const handleChange = e => {
		setQty(+e.target.value);
	}

	const handleKeyPress =  e => {
		if(e.key === 'Enter' && /^[0-9]+$/.test(e.target.value)) {
			changeQty(item._id, qty)	
		}
	}

	return (
		<tr>
			<td className="py-2">{item.name}</td>
			<td className="py-2">&#8369; {item.price}</td>
			<td className="py-2">
				<input value={qty} className="p-2 bg-gray-300 w-10" onChange={handleChange} onKeyPress={handleKeyPress} />
			</td>
			<td className="py-2">&#8369;{ item.subtotal }</td>
			<td className="py-2 flex justify-center items-center">
				<button 
					className="bg-blue-900 rounded-full p-1 text-white mr-1 hover:bg-blue-800"
					onClick={() => removeItem(item._id)}
				> 
					<MdClose /> 
				</button>
				<button className="bg-gray-300 rounded-full p-1 text-gray-700 hover:bg-gray-200"> 
					<MdRemove /> 
				</button>
			</td>
	 </tr>
	)
}

export default CartItem