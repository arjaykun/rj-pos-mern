import React, {useState} from 'react';
import OrderSummary from './OrderSummary';
import OrderForm from './OrderForm'
import { connect } from 'react-redux';
import { clearCart, removeItemInCart, changeQty } from '../../actions/cart';
import { addOrder } from '../../actions/orders';

const Cart = ({hideModal,cart, clearCart, removeItemInCart, changeQty, addOrder}) => {
	
	const [isOrder, setIsOrder] = useState(false)	
	const [ pay, setPay ] = useState('')

	const handleFirstButton = () => {
		if(!isOrder) {
			return hideModal()
		}
		setIsOrder(false)
	}

	const handleSecondButton = () => {
		if(!isOrder) 
			return setIsOrder(true)

		if(+pay >= cart.total && cart.orderItems.length > 0) {
			const change = (+pay - cart.total)
			const result = addOrder({ 
				items: cart.orderItems, 
				total: cart.total, 
				discount: cart.discount, 
				payment: pay,
				change: Number(change.toFixed(2)),
				isDine: cart.dineIn
			})

			if(result){
				alert('Order completed!')
				clearCart()
				setPay(0)
				setIsOrder(false)
				hideModal()
			}
			else
				alert("Order failed!") 
		}	
		else
			alert("Order Failed")
	}

	return (
		<div>

			<h1 className="text-2xl font-bold uppercase pb-2">
				{!isOrder ? "Order Summary" : "Pay Bills" }
			</h1>

			{!isOrder ? 
					<OrderSummary cart={cart} clearCart={clearCart} removeItemInCart={removeItemInCart} changeQty={changeQty} /> 
					: 
					<OrderForm load={isOrder} pay={pay} setPay={setPay} placeOrder={handleSecondButton} />
			}

			
			<div className="grid grid-cols-2 gap-2 items-center">
				<button 
					onClick={handleFirstButton}
					className="block bg-gray-300 text-gray-700 py-2 rounded-lg"
				>
					{!isOrder ? 'Close' : 'Return to Cart'}
				</button>
				<button 
					className="block bg-red-700 text-white py-2 rounded-lg"
					onClick={handleSecondButton}
				>
					{!isOrder ? 'Checkout' : 'Place Order'}
				</button>
			</div>
			
		</div>
	)
}

const mapStateToProps = state => ({
	cart: state.cart
})

const mapDispatchToProps = {
	clearCart, removeItemInCart, changeQty, addOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)