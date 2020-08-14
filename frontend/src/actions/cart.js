import { CART_LOADING, ADD_CART_ITEM } from './types';

export const addItemInCart = (item) => {
	return (dispatch, getState) => {
		dispatch({type: CART_LOADING})
		const { cart } = getState()
		const orderItems = cart.orderItems;
		//select item if existing in current state 
		const selected = orderItems.find( i => i._id === item._id)
		//if existing increment qty and update subtotal
		if(selected) {
			item = {...item, qty: selected.qty+1, subtotal: Math.round(item.price * (selected.qty + 1), 2)}
		}
		//get total
		dispatch({
			type: ADD_CART_ITEM,
		  payload: {
		  	item, 
		  	total: cart.total + item.price, 
		 	}
		})
	}
}

//clear all orderItems

// delete orderItem


