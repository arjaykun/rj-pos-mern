import React from 'react';
import { MdClose, MdRemove } from 'react-icons/md';
const CartItem = ({item}) => {
	return (
		<tr>
			<td className="py-2">{item.name}</td>
			<td className="py-2">&#8369; {item.price}</td>
			<td className="py-2">{item.qty}</td>
			<td className="py-2">&#8369;{ item.subtotal }</td>
			<td className="py-2 flex justify-center items-center">
				<button className="bg-blue-900 rounded-full p-1 text-white mr-1 hover:bg-blue-800"> 
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