import { ADD_ORDER, ORDER_LOADING, GET_ORDERS } from '../actions/types';

const initialState = {
	orders: [],
	loading: false,
	count: 0,
}

const ordersReducer = (state = initialState, action) => {
	switch(action.type) {
		case ORDER_LOADING:
			return { ...state, loading: true }
		case GET_ORDERS:
			return { ...state, orders: action.payload, loading: false}
		case ADD_ORDER:
			return {
				...state, orders: [action.payload, ...state.orders], loading: false
			}
		default: 
			return state;
	}
}

export default ordersReducer