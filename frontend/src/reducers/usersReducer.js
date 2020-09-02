import { GET_USERS, USER_LOADING, ADD_USER, UNLOADING, CHANGE_USERS_URL} from '../actions/types'

const initialReducer = {
	users: [],
	loading: false,
	count: 0,
	page: 1,
	totalPages: 1, 
	nextPage: null,
	prevPage: null,
	queries: { 
		page: 1,
		limit: 10,
		sort_by: 'name',
		asc: 1, // 1 for asc , -1 for desc
		start: '',
		end: '',
		filter_by: '',
		filter_with: '',
		search_by: '',
		search: '',
	},
}

const usersReducer = (state = initialReducer, action) => {
	switch(action.type) {
		case GET_USERS: 
			return {
				...state,
			  users: action.payload.data, 
			  count: action.payload.count,
				page: action.payload.page,
				totalPages: action.payload.totalPages, 
				nextPage: action.payload.nextPage,			
				prevPage: action.payload.prevPage,
			  loading: false
			}
		case ADD_USER: 
			return {
				...state,
				loading: false,
				users: [{...action.payload, isNew: true}, ...state.users]
			}
		case USER_LOADING:
			return { ...state, loading: true }
		case UNLOADING:
			return { ...state, loading: false }
		case CHANGE_USERS_URL:
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

export default usersReducer;
