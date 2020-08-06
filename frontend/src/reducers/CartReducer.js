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
				orderItems: [...state.orderItems, action.payload.item],
				loading: false,
			}
		default: 
			return state;
	}

}

export default cartReducer;