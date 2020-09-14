import React, {useEffect, useState} from 'react';
import { getOrders, change_url } from '../actions/orders';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from '../components/utils/Pagination';
import { FaChevronCircleRight, FaSortUp, FaSortDown, FaRecycle } from 'react-icons/fa';
import Loading from '../components/utils/Loading';
import Modal from '../components/utils/Modal';
import FilterOrders from '../components/orders/FilterOrders';
import moment from 'moment'

const Orders = ({getOrders, orders, loading, change_url}) => {
	
	const [sortDateAsc, setSortDateAsc] = useState(false)
	const [showFilter, setShowFilter] = useState(false)
	const {page, limit, sort_by, asc, end, start, search_by, search} = orders.queries
	
	useEffect( () => {
		getOrders(`/orders?page=${page}&limit=${limit}&sort_by=${sort_by}&asc=${asc}&search_by=${search_by}&search=${search}&start=${start}&end=${end}`);
		//eslint-disable-next-line
	}, [orders.queries])

	const handleDateSort = () => {
		setSortDateAsc( prevState => !prevState )

		change_url({asc: sortDateAsc? -1 : 1})
	}

	return (
		<div className="px-2">

			{orders.loading ? <Loading /> : null}

			<Modal show={showFilter} hideModal={ () => setShowFilter(false) } >
				<FilterOrders change_url={change_url} hideModal={ () => setShowFilter(false) } />
			</Modal>

			<div 
					className="p-2 px-2 mt-5 mb-2 flex justify-between items-center border-b border-t border-red-900"
			>
				<span className="text-xl uppercase font-bold">Order Logs</span>
				<div className="flex items-center">
					<button
						className="bg-gray-800 p-2 rounded-lg text-gray-100 hover:bg-gray-700 mr-1"
						onClick={ () => setShowFilter(true) }
					>
						Filter Order
					</button>
					{
						orders.queries.search || orders.queries.start || orders.queries.end ?
						<button
							className="bg-green-800 p-2 rounded-lg text-gray-100 hover:bg-green-700"
							onClick={ () => change_url({search: '', end: '', start: ''}) }
						>
							<FaRecycle />
						</button> : null
					}
					

				</div>
			</div>
			<table className="table-auto w-full">
				
				<thead>
					<tr className="bg-red-200 text-sm text-left uppercase">
						<th 
							className="font-bolder p-2 text-left flex items-center cursor-pointer" 
							onClick={handleDateSort}
						>
							Date 
							{
								sortDateAsc ?
									<FaSortUp className="ml-2" /> 
								:
								 <FaSortDown className="ml-2" /> 
							}
							
						</th>
						<th className="font-bolder p-2 text-left">Order ID</th>
						<th className="font-bolder p-2 text-left">Total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{
						orders.orders.length > 0 ?
							orders.orders.map( (order, index) => (
								<tr key={order._id} className={`${index%2 !== 0? 'bg-gray-200' : null} text-sm`}>
									<td className="py-2">{ moment(order.createdAt).format('MM/DD/YY hh:mm A')}</td>
									<td className="py-2">{ order.order_id }</td>
									<td className="py-2">&#8369; {order.total}</td>
									<td className="py-2">
										<Link to={{pathname:`/admin/orders/${order._id}`, data:order}} >
											<FaChevronCircleRight />
										</Link>
									</td>
								</tr>
							))
						: <tr><td colSpan="4" className="text-center text-4xl bg-gray-200 py-5 font-bold">No Orders</td></tr>
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