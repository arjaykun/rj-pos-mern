import { GET_SALES, SALES_LOADING } from '../actions/types'

const initialState = {
	loading: false,
	today: null,
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
				daily: action.payload.daily.reverse(),
				monthly: action.payload.monthly.reverse(),
				yearly: action.payload.yearly.reverse(),
				today: action.payload.today,
				loading: false,
			}
		default:
			return state
	}
}

export default salesReducer