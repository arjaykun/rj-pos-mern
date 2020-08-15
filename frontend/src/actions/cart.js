import { CART_LOADING, ADD_CART_ITEM, CLEAR_CART, REMOVE_CART_ITEM, CHANGE_ITEM_QTY } from './types';

//add item to cart
export const addItemInCart = (item) => {
	return (dispatch, getState) => {
		dispatch({type: CART_LOADING})
		const { cart } = getState()
		const selected =  findItem(cart, item._id)

		if(selected.item) {
			item = {...item, qty: selected.item.qty+1, subtotal: Number((item.price * (selected.item.qty + 1)).toFixed(2)) }
		}

		const newItems = [item, ...selected.items]
		setTimeout( () => {
				dispatch({
					type: ADD_CART_ITEM,
				  payload: {
				  	items: newItems, 
				  	total: getTotal(newItems), 
				 	}
				})
		}, 500)
		
	}
}

//clear all orderItems
export const clearCart = () => {
	return dispatch => {
		dispatch({ type: CART_LOADING })
		dispatch({ type: CLEAR_CART })
	}
}

// delete orderItem
export const removeItemInCart = itemId => {
	return (dispatch, getState) => {
		dispatch({ type: CART_LOADING })
		const { cart } = getState()
		const selected =  findItem(cart, itemId)
			
		dispatch({ type: REMOVE_CART_ITEM, payload: {
				items: selected.items,
				total: getTotal(selected.items)
			} 
		})
	}
}

//change item qty and update price
export const changeQty = (itemId, newQty) => {
	return (dispatch, getState) => {
		dispatch({ type: CART_LOADING })
		const { cart } = getState()
		const selected =  findItem(cart, itemId)
		
		if(selected) {
			const item = {...selected.item, qty: newQty, subtotal: Number((selected.item.price * newQty).toFixed(2))}

			console.log(item)
			const newItems = [item, ...selected.items]

			dispatch({ type: CHANGE_ITEM_QTY, payload: { 
			 		items: newItems,
			 		total: getTotal(newItems) 
				}
			})
		}
	}
}


function findItem(cart, itemId) {
		const orderItems = cart.orderItems;
		//select item if existing in current state 
	  return { 
	  	item: orderItems.find( i => i._id === itemId),
	  	items: orderItems.filter( item => item._id !== itemId )
	  }
}

function getTotal(items) {
	return items.reduce( (total, item) => Number((total + item.subtotal ).toFixed(2)) ,0)
}
