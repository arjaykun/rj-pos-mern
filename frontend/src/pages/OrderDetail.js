import React from 'react';
import { MdCheckCircle, MdRemoveCircle } from 'react-icons/md';

const OrderDetail = ({match, history, location}) => {
	const order = location.data

	if(typeof order === 'undefined') {
		history.push('/admin/orders')
		return null;		
	}

	return (
		<div className="px-2">
			<div 
					className="py-2 px-2 mt-5 mb-2 flex justify-between items-center border-b border-t border-red-900"
				>
				<button
						className="bg-red-700 p-2 rounded-lg text-gray-100 hover:bg-red-600"
						onClick={ () => history.goBack() }
					>
						Back to orders
				</button>	
				<h1 className="flex items-center">
					{order.createdAt}
					{ order.completed ? 
						<MdCheckCircle className="text-green-400 ml-2 text-lg" /> :
						<MdRemoveCircle className="text-red-400 ml-2 text-lg" />
					}
				</h1>
			</div>
			
			<table className="table-auto w-full">
				<thead >
					<tr className="bg-gray-200 text-sm text-left uppercase">
						<th className="p-2 font-bold">Item</th>
						<th className="p-2 font-bold">Price</th>
						<th className="p-2 font-bold">Qty</th>
						<th className="p-2 font-bold">Subtotal</th>
					</tr>
				</thead>
				<tbody>
					{
						order.items.map( item => (
							<tr key={item._id}>
								<td>{item.name}</td>
								<td>&#8369;{item.price}</td>
								<td>{item.qty}</td>
								<td>&nbsp;&#8369;{item.subtotal}</td>
							</tr>
						))
					}
					<tr>
						<td colSpan="2"></td>
						<td className="font-extrabold uppercase text-right">Discount:</td>
						<td className="border-t-2 border-gray-800">-&#8369;{order.discount}</td>
					</tr>
					<tr>
						<td colSpan="3" className="font-extrabold uppercase text-right pb-1">Total:</td>
						<td className="text-lg font-bold">&nbsp;&#8369;{order.total}</td>
					</tr>

					<tr>
						<td colSpan="2"></td>
						<td className="font-extrabold uppercase text-right">Payment:</td>
						<td className="border-t-2 border-gray-800">-&#8369;{order.payment}</td>
					</tr>
					<tr>
						<td colSpan="3" className="font-extrabold uppercase text-right">Change:</td>
						<td className="text-lg font-bold">&nbsp;&#8369;{order.change}</td>
					</tr>
				</tbody>
			</table>

		</div>
	)
}

export default OrderDetail