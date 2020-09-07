import React from 'react';
import {FaSlackHash, FaShoppingBasket, FaRegUserCircle, FaChevronCircleRight} from 'react-icons/fa';
import DbPanel from '../components/admin/DbPanel'
import moment from 'moment';
import { connect } from 'react-redux';

const Home = ({user}) => {

	return (
		<div className="px-2">
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
			<h1 className="border-b border-t border-red-900 my-2 font-bold py-2 uppercase text-lg">
				Order Status
			</h1>
			<div className="grid grid-cols-2 gap-1">
				<DbPanel 
					end={25}
					title="Today's Order"
				  color="red" 
				  icon={<FaSlackHash />}
				 />
				<DbPanel 
					end={5} 
					title="Pending Order" 
					color="orange" 
					icon={<FaShoppingBasket />}
				/>
			</div>
			<h1 className="border-b border-t border-red-900 my-2 font-bold py-2 uppercase text-lg flex items-center justify-between">
				<span>Pending Orders</span>
				<button> Refresh</button>
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
			
					<tr className="">
						<td className="py-2">{ moment().format('MM/DD/YY hh:mm A')}</td>
						<td className="py-2">123</td>
						<td className="py-2">&#8369; 102</td>
						<td className="py-2">	
								<FaChevronCircleRight />
						</td>
					</tr>

					<tr className="bg-gray-300">
						<td className="py-2">{ moment().format('MM/DD/YY hh:mm A')}</td>
						<td className="py-2">123</td>
						<td className="py-2">&#8369; 102</td>
						<td className="py-2">	
								<FaChevronCircleRight />
						</td>
					</tr>
				
				</tbody>

			</table>

		</div>
	)
}

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps)(Home)