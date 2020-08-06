import React from 'react';
import DbPanel from '../components/admin/DbPanel'
import Chart from '../components/admin/Chart'
import {FaMoneyBillWave, FaMoneyCheckAlt, FaSlackHash, FaShoppingBasket} from 'react-icons/fa';

const ComponentName = () => {
	return (
		<div className="px-2">

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
					end={55320} 
					title="This Month Sales" 
					color="purple" 
					icon={<FaMoneyCheckAlt />}
				/>
				<DbPanel 
					end={25}
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

export default ComponentName