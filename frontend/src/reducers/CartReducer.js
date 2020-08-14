import { CART_LOADING, ADD_CART_ITEM } from '../actions/types';

const initialState = {
	orderItems: [],
	discount: 0,
	total: 0,
	dineIn: false,
	loading: false
}

const cartReducer = (state=initialState, action) => {
 
	switch(action.type) {
		case CART_LOADING:
			return { ...state, loading: true}
		
		case ADD_CART_ITEM: 
			return {
				...state,
				orderItems: [
					action.payload.item, 
					...state.orderItems.filter( item => item._id !== action.payload.item._id),
				],
				total: action.payload.total,
				loading: false,
			}
		default: 
			return state;
	}

}

export default cartReducer;