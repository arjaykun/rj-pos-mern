import React, {useEffect} from 'react';
import { getOrders, change_url } from '../actions/orders';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from '../components/utils/Pagination';

const url_base = "http://localhost:8000"

const Orders = ({getOrders, orders, loading, change_url}) => {
	
	const {page, limit} = orders.queries
	
	useEffect( () => {
		getOrders(`${url_base}/orders?page=${page}&limit=${limit}`);
		//eslint-disable-next-line
	}, [orders.queries])


	return (
		<div className="px-2">
			<div 
					className="p-2 px-2 mt-5 mb-2 flex justify-between items-center border-b border-t border-red-900"
			>
				<span className="text-xl uppercase font-bold">Order Logs</span>
				<button
					className="bg-gray-800 p-2 rounded-lg text-gray-100 hover:bg-gray-700"
				>
					Filter Order
				</button>
			</div>
			<table className="table-auto w-full">
				
				<thead>
					<tr className="bg-gray-200 text-sm text-left uppercase">
						<th className="font-bolder p-2">Date</th>
						<th className="font-bolder p-2">Total</th>
						<th className="font-bolder p-2">Status</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{
						orders.orders.map( order => (
							<tr key={order._id}>
								<td>{order.createdAt}</td>
								<td>&#8369; {order.total}</td>
								<td>{ order.completed ? 'true' : 'false'}</td>
								<td>
									<Link to={{pathname:`/admin/orders/${order._id}`, data:order}} >view</Link>
								</td>
							</tr>
						))
					}
				</tbody>

			</table>

			<Pagination data={orders} change_url={change_url} />
		</div>
	)
}

const mapStateToProps = state => ({
	orders: state.orders,
})

export default connect(mapStateToProps, {getOrders, change_url})(Orders)