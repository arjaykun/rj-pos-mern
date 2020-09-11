import React from 'react'
import moment from 'moment'
import { MdCheckCircle } from 'react-icons/md'

const OrderDetail = ({completeOrder, order}) => {

	const handleClick = () => {
		completeOrder()
	}

	return (
		<div>
			<h1 className="text-xl font-bold text-gray-700 uppercase pb-2">
				Order Details
			</h1>
			<div className="py-2">
				<div className="flex items-center justify-between">
					<div>
						<span className="font-bold text-red-500">ID: </span> 
						{order.order_id} ({ order.completed ? 'Completed' : 'Pending'})
					</div>
					<div className="flex items-center">
						<span className="font-bold text-red-500">Date: </span> 
						<div>
							&nbsp;
							{ moment(order.createdAt).format('MM/DD/YYYY hh:mm A') }
						</div>
					</div>
				</div>	
				<div><span className="font-bold text-red-500">Received by: </span> Test User</div>
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
						<td className="font-extrabold text-red-500 uppercase text-right">Discount:</td>
						<td className="border-t-2 border-gray-800">-&#8369;{order.discount}</td>
					</tr>
					<tr>
						<td colSpan="3" className="font-extrabold text-red-500 uppercase text-right pb-1">Total:</td>
						<td className="text-lg font-bold">&nbsp;&#8369;{order.total}</td>
					</tr>

					<tr>
						<td colSpan="2"></td>
						<td className="font-extrabold text-red-500 uppercase text-right">Payment:</td>
						<td className="border-t-2 border-gray-800">-&#8369;{order.payment}</td>
					</tr>
					<tr>
						<td colSpan="3" className="font-extrabold text-red-500 uppercase text-right">Change:</td>
						<td className="text-lg font-bold">&nbsp;&#8369;{order.change}</td>
					</tr>
				</tbody>
			</table>

			<button 
				className={`btn w-full my-4 bg-red-700 flex items-center justify-center hover:bg-red-600`}
				onClick={handleClick}
				>
				<div className=" uppercase font-bold">Serve Order</div>
				<MdCheckCircle className="ml-2 text-xl text-white" />
				
			</button>
		</div>
	)
}

export default OrderDetail