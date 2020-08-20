import React, {useState} from 'react';
import OrderSummary from './OrderSummary';
import OrderForm from './OrderForm'
import { connect } from 'react-redux';
import { clearCart, removeItemInCart, changeQty } from '../../actions/cart';

const Cart = ({hideModal,cart, clearCart, removeItemInCart, changeQty}) => {
	
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

		if(+pay >= cart.total)
			alert(+pay -cart.total)
		else
			alert("Invalid Payment")
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
	clearCart, removeItemInCart, changeQty
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)