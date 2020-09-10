import React, { useEffect } from 'react';
import DbPanel from '../components/admin/DbPanel'
import Chart from '../components/admin/Chart'
import Loading from '../components/utils/Loading'
import {FaMoneyBillWave, FaMoneyCheckAlt, FaSlackHash, FaShoppingBasket} from 'react-icons/fa';
import { connect } from 'react-redux'
import { getSales } from '../actions/sales'

const Dashboard = ({getSales, sales}) => {

	useEffect( () => {
		getSales('/orders/sales')
		// eslint-disable-next-line
	}, [])

	return (
		<div className="px-2">
			{ sales.loading ? <Loading /> : null }
			<div 
				className="py-2 px-2 mt-5 mb-2 flex justify-between items-center border-b border-t border-red-900"
			>
				<span className="text-xl uppercase font-bold">Dashboard</span>
				<button
					className="bg-gray-800 p-2 rounded-lg text-gray-100 hover:bg-gray-700"
				>
					Refresh
				</button>
			</div>

			<div className="grid grid-cols-2 gap-1">
				<DbPanel 
					end={2000}
					title="Today Sales"
				  color="blue" 
				  icon={<FaMoneyBillWave />}
				 />
				<DbPanel 
					end={sales.yearly.reduce( (total, curr) => total + curr.daily_sales ,0)} 
					title="This Month Sales" 
					color="purple" 
					icon={<FaMoneyCheckAlt />}
				/>
				<DbPanel 
					end={sales.yearly.reduce( (total, curr) => total + curr.order_count ,0)}
					title="Today's Order"
				  color="red" 
				  icon={<FaSlackHash />}
				 />
				<DbPanel 
					end={520} 
					title="This Month's Order" 
					color="orange" 
					icon={<FaShoppingBasket />}
				/>
			</div>
			{/*charts*/}
			<div className="py-3"
				>
					<Chart />
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	sales: state.sales
})

export default connect(mapStateToProps, {getSales})(Dashboard)