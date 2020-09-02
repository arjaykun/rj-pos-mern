import { ADD_ORDER, ORDER_LOADING, GET_ORDERS, CHANGE_ORDERS_URL } from '../actions/types';

const initialState = {
	orders: [],
	loading: false,
	count: 0,	
	page: 1,
	totalPages: 1, 
	nextPage: null,
	prevPage: null,
	queries: { 
		page: 1,
		limit: 20,
		sort_by: 'createdAt',
		asc: -1, // 1 for asc , -1 for desc
		start: '',
		end: '',
		filter_by: '',
		filter_with: '',
		search_by: 'order_id',
		search: '',
	},
}

const ordersReducer = (state = initialState, action) => {
	switch(action.type) {
		case ORDER_LOADING:
			return { ...state, loading: true }
		case GET_ORDERS:
			return {
			 ...state,
			  orders: action.payload.data, 
			  count: action.payload.count,
				page: action.payload.page,
				totalPages: action.payload.totalPages, 
				nextPage: action.payload.nextPage,				
				prevPage: action.payload.prevPage,
			  loading: false
			}
		case ADD_ORDER:
			return {
				...state, orders: [action.payload, ...state.orders], loading: false
			}
		case CHANGE_ORDERS_URL:
			return {
				...state,
				queries: {
					...state.queries,
					...action.payload
				}
			}
		default: 
			return state;
	}
}

export default ordersReducer