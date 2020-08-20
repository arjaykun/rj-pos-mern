import React, {Fragment} from 'react';
import CartItem from './CartItem';

const OrderSummary = ({cart, clearCart, removeItemInCart, changeQty}) => {
	return (
		<table className="table-auto w-full">
				<thead className="text-gray-700 text-xs">
					<tr>
							<th className="py-2 text-left">Item</th>
							<th className="py-2 text-left">Price</th>
							<th className="py-2 text-left">Qty</th>
							<th className="py-2 text-left">Subtotal</th>
							<th className="py-2">
								{
									cart.orderItems.length > 0 ?
										<button 
											className="px-2 py-0 bg-gray-300 text-gray-700 rounded-lg text-xs"
											onClick={ () => clearCart() }
										>
										clear
									</button> : null
								}
								
							</th>
					</tr>
				</thead>
				<tbody className="text-gray-800 text-base">
				 {
				 	cart.orderItems.length > 0 ?
				 	<Fragment>
						{	
							cart.orderItems.map( item => (
								<CartItem 
									item={item} 
									key={item._id}
								  removeItem={removeItemInCart}
								  changeQty={changeQty}
								 />
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
	)
}


export default OrderSummary