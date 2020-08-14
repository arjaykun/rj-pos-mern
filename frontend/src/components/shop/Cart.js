import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';

const Cart = ({hideModal, cart}) => {
	return (
		<div>
			<h1 className="text-2xl font-bold uppercase pb-2">Order Summary</h1>
			<table className="table-auto w-full">
				<thead className="text-gray-700 text-xs">
					<tr>
							<th className="py-2 text-left">Item</th>
							<th className="py-2 text-left">Price</th>
							<th className="py-2 text-left">Qty</th>
							<th className="py-2 text-left">Subtotal</th>
							<th className="py-2">
								<button 
									className="px-2 py-0 bg-gray-300 text-gray-700 rounded-lg text-xs"
								>
									clear
								</button>
							</th>
					</tr>
				</thead>
				<tbody className="text-gray-800 text-base">
				 {
				 	cart.orderItems.length > 0 ?
				 	<Fragment>
						{	
							cart.orderItems.map( item => (
								<CartItem item={item} key={item._id} />
							))
						}
						<tr className="border-t-2 border-gray-700">
							<td colSpan="3" className="font-extrabold uppercase">Total</td>
							<td className="py-2">&#8369;{cart.total}</td>
						</tr>
					</Fragment>
					:
						<tr>
							<td
								colSpan="5" 
								className="text-center font-bold text-gray-700 text-2xl py-5">
								Cart is Empty!
							</td>
						</tr>
				 }
				</tbody>
			</table>
			
			<div className="grid grid-cols-2 gap-2 items-center">
				<button 
					onClick={() => hideModal()}
					className="block bg-gray-300 text-gray-700 py-2 rounded-lg">
					Close
				</button>
				<button 
					className="block bg-red-700 text-white py-2 rounded-lg">
					Place Order
				</button>
			</div>
			
		</div>
	)
}

const mapStateToProps = state => ({
	cart: state.cart
})

export default connect(mapStateToProps)(Cart)