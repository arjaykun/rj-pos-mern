import React from 'react';

const Orders = () => {
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
					<tr className="border-b-2">
						<td className="p-2">06/12/2020</td>
						<td className="p-2">&#8369;580</td>
						<td className="p-2">completed</td>
						<td className="p-2">
							<button>view</button>
						</td>
					</tr>
					<tr className="border-b-2">
						<td className="p-2">06/12/2020</td>
						<td className="p-2">&#8369;580</td>
						<td className="p-2">completed</td>
						<td className="p-2">
							<button>view</button>
						</td>
					</tr>
					<tr className="border-b-2">
						<td className="p-2">06/12/2020</td>
						<td className="p-2">&#8369;580</td>
						<td className="p-2">completed</td>
						<td className="p-2">
							<button>view</button>
						</td>
					</tr>
				</tbody>

			</table>
		</div>
	)
}

export default Orders