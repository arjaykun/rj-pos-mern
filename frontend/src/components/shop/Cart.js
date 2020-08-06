import React from 'react';
import { MdClose, MdRemove } from 'react-icons/md'

const Cart = ({hideModal}) => {
	return (
		<div>
			<h1 className="text-2xl font-bold uppercase pb-2">Order Summary</h1>
			<table className="table-auto w-full">
				<thead className="text-gray-700 text-xs">
					<tr>
							<th className="py-2 text-left">Item</th>
							<th className="py-2 text-left">Price</th>
							<th className="py-2 text-left">Qty</th>
							<th className="py-2 text-left">Subtotal</th>
							<th className="py-2">
								<button 
									className="px-2 py-0 bg-gray-300 text-gray-700 rounded-lg text-xs"
								>
									clear
								</button>
							</th>
					</tr>
				</thead>
				<tbody className="text-gray-800 text-base">
					<tr>
						<td className="py-2">Cheese Burger</td>
						<td className="py-2">&#8369;15</td>
						<td className="py-2">2</td>
						<td className="py-2">&#8369;30</td>
						<td className="py-2 flex justify-center items-center">
							<button className="bg-blue-900 rounded-full p-1 text-white mr-1 hover:bg-blue-800"> 
								<MdClose /> 
							</button>
							<button className="bg-gray-300 rounded-full p-1 text-gray-700 hover:bg-gray-200"> 
								<MdRemove /> 
							</button>
						</td>
					</tr>
					<tr>
						<td className="py-2">Coke Sakto</td>
						<td className="py-2">&#8369;12</td>
						<td className="py-2">1</td>
						<td className="py-2">&#8369;12</td>
						<td className="py-2 flex justify-center items-center">
							<button className="bg-blue-900 rounded-full p-1 text-white mr-1 hover:bg-blue-800"> 
								<MdClose /> 
							</button>
							<button className="bg-gray-300 rounded-full p-1 text-gray-700 hover:bg-gray-200"> 
								<MdRemove /> 
							</button>
						</td>
					</tr>
					<tr className="border-t-2 border-gray-700">
						<td colSpan="3" className="font-extrabold uppercase">Total</td>
						<td className="py-2">&#8369;42</td>
					</tr>
				</tbody>
			</table>
			
			<div className="grid grid-cols-2 gap-2 items-center">
				<button 
					onClick={() => hideModal()}
					className="block bg-gray-300 text-gray-700 py-2 rounded-lg">
					Close
				</button>
				<button 
					className="block bg-red-700 text-white py-2 rounded-lg">
					Place Order
				</button>
			</div>
			
		</div>
	)
}

export default Cart