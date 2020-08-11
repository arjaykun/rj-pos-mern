import { GET_CATEGORIES, CATEGORIES_LOADING } from '../actions/types'

const initialState = {
	categories: [],
	loading: false,
}

const categoriesReducer = (state = initialState, action) => {
	switch(action.type) {
		case CATEGORIES_LOADING: 
			return { ...state, loading: true};
		case GET_CATEGORIES:
			return {...state, categories: action.payload, loading: false}
		default:
			return state;
	}
} 

export default categoriesReducer;


