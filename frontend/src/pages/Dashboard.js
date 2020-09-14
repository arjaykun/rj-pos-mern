import React, { useEffect } from 'react';
import DbPanel from '../components/admin/DbPanel'
import Chart from '../components/admin/Chart'
import Loading from '../components/utils/Loading'
import {FaMoneyBillWave, FaMoneyCheckAlt, FaSlackHash, FaShoppingBasket, FaCoins, FaMoneyBillAlt} from 'react-icons/fa';
import { connect } from 'react-redux'
import { getSales } from '../actions/sales'
import moment from 'moment'

const Dashboard = ({getSales, sales}) => {

	useEffect( () => {
		getSales('/sales')
		// eslint-disable-next-line
	}, [])

	const month = sales.monthly.find( sale => sale._id.month === moment().month() + 1);
	const year = sales.yearly.find( sale => sale._id.year === moment().year() );

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
			<h1 className="text-xl text-gray-700 py-1 font-bold">Earnings/ Sales Status</h1>
			<div className="grid grid-cols-2 gap-1">
				<DbPanel 
					end={sales.yearly.reduce((total, current) => total + current.sales, 0)}
					title="Total Earnings"
				  color="red" 
				  money={true}
				  icon={<FaMoneyCheckAlt />}
				 />
				<DbPanel 
					end={sales.today && sales.today.sales ? sales.today.sales : 0}
					title="Today's Earnings"
				  color="blue" 
				  money={true}
				  icon={<FaCoins />}
				 />
				 <DbPanel 
					end={year && year.sales ? year.sales : 0} 
					title={`${moment().format('YYYY')} Earnings`}
					color="indigo" 
					money={true}
					icon={<FaMoneyBillWave />}
				/>
				<DbPanel 
					end={ month && month.sales ? month.sales : 0} 
					title={`${moment().format('MMMM')}'s Earnings`}
					color="purple" 
					money={true}
					icon={<FaMoneyBillAlt />}
				/>
			</div>
			<h1 className="text-xl text-gray-700 py-1 font-bold">Servings/ Orders Status</h1>
			<div className="grid grid-cols-2 gap-1">			
				<DbPanel 
					end={sales.today ? sales.today.order_count : 0 }
					title="Today's Serving"
				  color="orange" 
				  money={false}
				  icon={<FaSlackHash />}
				 />
				<DbPanel 
					end={ month && month.order_count ? month.order_count : 0} 
					title={`${moment().format('MMMM')}'s' Servings`}
					color="yellow"
					money={false}
					icon={<FaShoppingBasket />}
				/>
			</div>
			{/*charts*/}
			<h1 className="border-b border-t border-red-900 my-2 font-bold py-2 uppercase text-lg">
				<span>Sales Chart ( <small className="text-xs">for monthly & daily earnings</small>)</span>
			</h1>
			<div className="py-3"
				>
				{
					sales.daily.length > 0?
					<Chart 
						labels={ sales.daily.map( sale => moment({...sale._id, month: sale._id.month -1}).format('MM/DD/YYYY')) } 
						data={ sales.daily.map( sale => Number(sale.sales) ) } 
						title="Daily Sales"
					/> : null
				}
					
			</div>

			<div className="py-3"
				>
				{
					sales.daily.length > 0?
						<Chart 
							labels={ sales.monthly.map( sale => moment({...sale._id, month: sale._id.month -1}).format('MMMM')  ) } 
							data={ sales.monthly.map( sale => Number(sale.sales) ) } 
							title="Monthly Sales"
						/> : null
				}
			</div>

			<div className="text-xs text-center bg-gray-300 text-gray-800 uppercase mt-6">
          Developed by: <strong>Ryle Jaylee</strong> <br/>
          All rights and reserved &copy; 2020 
       </div>

		</div>
	)
}

const mapStateToProps = state => ({
	sales: state.sales
})

export default connect(mapStateToProps, {getSales})(Dashboard)