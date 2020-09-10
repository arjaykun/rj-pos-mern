import React, { useEffect, useState } from 'react';
import {FaSlackHash, FaShoppingBasket, FaRegUserCircle } from 'react-icons/fa';
import DbPanel from '../components/admin/DbPanel'
import Loading from '../components/utils/Loading'
import Modal from '../components/utils/Modal'
import moment from 'moment';
import { connect } from 'react-redux';
import { getOrders, completeOrder } from '../actions/orders'
import { getSales } from '../actions/sales'
import OrderRow from '../components/orders/OrderRow'
import OrderDetail from '../components/orders/OrderDetail'


const Home = ({user, orders, loading, sales_loading, count, getOrders, completeOrder, getSales}) => {

	const [ showModal, setShowModal ] = useState(false)
	const [ order, setOrder ] = useState({items: [], _id: '', total: 0,})

	useEffect( () => {
		getPendingOrders()
		getSales('/orders/sales')
		// eslint-disable-next-line
	}, [])

	const getPendingOrders = () => {
		getOrders(`/orders?page=1&limit=100&filter_by=completed&filter_with=false`)
	}

	// get the selected order then show the modal passing that order in OrderDetail component
	const handleShowOrder = data => {
		setOrder(data)
		setShowModal(true)
	}

	return (
		<div className="px-2">

			<Modal show={showModal} hideModal={ () => setShowModal(false) }>
				<OrderDetail order={order} completeOrder={completeOrder} />
			</Modal>
			{ loading && sales_loading ? <Loading /> : null}

			<div 
				className="py-2 mt-5 flex justify-between items-center"
			>
				<div className="text-base text-gray-700">
					Today is 
					<span className="text-gray-800 font-bold ml-1">
						{ moment().format('MM/DD/YYYY') }
					</span>
				</div>

				<div className="uppercase flex items-center font-bold text-blue-800">
					{user.name}
					<FaRegUserCircle  className="ml-1 text-gray-900"/> 
				</div>
				
			</div>
			<h1 className="border-b border-t border-red-900 my-2 font-bold py-2 uppercase text-lg flex items-center justify-between">
				<span>Order Status</span>
				<button
					className="p-2 bg-green-400 text-white hover:bg-green-300 rounded-lg uppercase font-bold text-sm"
					onClick={ () => getPendingOrders()}
				> Refresh </button>
			</h1>
			<div className="grid grid-cols-2 gap-1">
				<DbPanel 
					end={25}
					title="Today's Order"
				  color="red" 
				  icon={<FaSlackHash />}
				 />
				<DbPanel 
					end={orders.length} 
					title="Pending Order" 
					color="orange" 
					icon={<FaShoppingBasket />}
				/>
			</div>
			<h1 className="border-b border-t border-red-900 my-2 font-bold py-2 uppercase text-lg">
				<span>Pending Orders</span>
			</h1>
			<table className="table-auto w-full">
				
				<thead>
					<tr className="bg-red-200 text-sm text-left uppercase">
						<th className="font-bolder p-2 text-left flex items-center cursor-pointer">Order Date</th>
						<th className="font-bolder p-2 text-left">Order ID</th>
						<th className="font-bolder p-2 text-left">Total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>

					{ 
						count > 0 ?
						orders.map( order => (
							<OrderRow key={order._id} order={order} showOrder={ () => handleShowOrder(order)}/>
						)) :
						<tr>
							<td colSpan="4" className="text-center text-3xl font-bold text-gray-700"> 
								No Pending Orders
							</td>
						</tr>
					}
			
			
				
				</tbody>

			</table>

		</div>
	)
}

const mapStateToProps = state => ({
	user: state.auth.user,
	orders: state.orders.orders,
	loading: state.orders.loading,
	sales_loading: state.sales.loading,
	count: state.orders.count,
})

export default connect(mapStateToProps, {getOrders, completeOrder, getSales})(Home)