import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';

const OrderForm = ({total, load, pay, setPay, placeOrder}) => {
	
	const inputRef = useRef()

	useEffect( ()=> {
		inputRef.current.focus()
	}, [load]) 

	const handleKeyPress = e => {
		if(e.key === "Enter")
				placeOrder()
	}

	return (
		<div>
			<div className="p-2 bg-gray-300 mb-2">
				<h1 className="uppercase text-sm font-bold text-gray-600">TOTAL</h1>
				<div className="text-5xl text-center font-extrabold text-gray-700">&#8369;{total}</div>
			</div>
			<div className="p-2 mb-2 bg-gray-300">
				<h1 className="uppercase text-sm font-bold text-gray-600">PAY</h1>
				<input 
					type="number" 
					className="w-full border-none bg-gray-300 text-5xl font-bold appearance-none text-center" 
					onChange={ e=> setPay(e.target.value)}
					onKeyPress={handleKeyPress}
					ref={inputRef}
					value={pay}
				 />
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	total: state.cart.total,
})

export default connect(mapStateToProps)(OrderForm)