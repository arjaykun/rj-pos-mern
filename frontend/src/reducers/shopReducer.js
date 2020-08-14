import { GET_SHOP_ITEMS, SHOP_ITEMS_LOADING ,GET_ALL_ITEMS } from '../actions/types'

const initialState = {
	categories: [],
	allItems:[],
	count: 0,
	loading: false,
}

const shopReducer = (state=initialState, action) => {
	switch(action.type) {
		case SHOP_ITEMS_LOADING:
			return { ...state, loading: true}
		case GET_SHOP_ITEMS: 
			return {
				...state, 
				loading: false,
				count: action.payload.count,
				categories: action.payload.data,
			}
		case GET_ALL_ITEMS:
			return {
				...state, 
				allItems: action.payload,
			}
		default:
			return state
	}
}

export default shopReducer