import { CART_LOADING, ADD_CART_ITEM, CLEAR_CART, REMOVE_CART_ITEM, CHANGE_ITEM_QTY } from '../actions/types';

const initialState = {
	orderItems: [],
	discount: 0,
	total: 0,
	payment:0,
	dineIn: false,
	loading: false
}

const cartReducer = (state=initialState, action) => {
 
	switch(action.type) {
		case CART_LOADING:
			return { ...state, loading: true}
		
		case ADD_CART_ITEM: 		
		case REMOVE_CART_ITEM:	
		case CHANGE_ITEM_QTY: 
			return {
				...state,
				orderItems: action.payload.items,
				total: action.payload.total,
				loading: false,
			}
		case CLEAR_CART:
			return initialState;
		default: 
			return state;
	}

}

export default cartReducer;