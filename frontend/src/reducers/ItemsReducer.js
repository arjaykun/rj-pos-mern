import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEMS_LOADING, UNLOADING, CHANGE_ITEMS_URL } from '../actions/types';

const initialState = {
	items: [],
	categories: ['burger', 'drink', 'dessert'],
	loading: false,
	count: 0,
	page: 1,
	totalPages: 1, 
	nextPage: null,
	prevPage: null,
	queries: { 
		page: 1,
		limit: 10,
		sort_by: '',
		asc: 1, // 1 for asc , -1 for desc
		start: '',
		end: '',
		filter_by: '',
		filter_with: '',
		search_by: '',
		search: '',
	},
}

const ItemsReducer = (state = initialState, action) => {
	switch(action.type) {
		case GET_ITEMS: 
			return {
				...state, items:action.payload.data, 
				loading: false,
				count: action.payload.count,
				page: action.payload.page,
				totalPages: action.payload.totalPages, 
				nextPage: action.payload.nextPage,
				prevPage: action.payload.prevPage,
		}
		case ITEMS_LOADING:
			return  {...state, loading: true}
		case UNLOADING:
			return { ...state, loading: false}
		case ADD_ITEM: 
			return {
				...state, 
				items: [ {...action.payload, isNew: true }, ...state.items ] , 
				loading: false,
			}
		case UPDATE_ITEM:
			return {
				...state,
				items: [ {...action.payload, isNew:true}, ...state.items.filter( item => item._id !== action.payload._id)],
				loading: false,
			}
		case DELETE_ITEM: 
			return {
				...state, 
				items: state.items.filter( item => item._id !== action.payload ), 
				loading: false
			}
		case CHANGE_ITEMS_URL:
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

export default ItemsReducer;