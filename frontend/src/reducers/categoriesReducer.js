import { GET_CATEGORIES, CATEGORIES_LOADING, UNLOADING, ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../actions/types'

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
		case UNLOADING: 
			return {...state, loading: false}
		case ADD_CATEGORY:
			return {
				...state, 
				loading: false, 
				categories: [{...action.payload, isNew: true}, ...state.categories]
			}
		case DELETE_CATEGORY:
			return {
				...state,
				loading: false,
				categories: state.categories.filter( category => category._id !== action.payload)
			}
		case UPDATE_CATEGORY:
			return {
				...state,
				loading: false,
				categories: [{...action.payload, isNew: true}, ...state.categories.filter( category => category._id !== action.payload._id)]
			}
		default:
			return state;
	}
} 

export default categoriesReducer;


