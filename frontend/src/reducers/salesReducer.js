import { GET_SALES, SALES_LOADING } from '../actions/types'

const initialState = {
	loading: false,
	today: {},
	daily: [],
	monthly: [],
	yearly: [],
}

const salesReducer = (state = initialState, action) => {
	switch(action.type) {
		case SALES_LOADING: 
			return { ...state, loading: true }
		case GET_SALES:
			return {
				...state,
				daily: action.payload.daily,
				monthly: action.payload.monthly,
				yearly: action.payload.yearly,
				loading: false,
			}
		default:
			return state
	}
}

export default salesReducer