import { LOGIN_USER, AUTH_LOADING, LOAD_USER, UNLOADING, LOGOUT_USER, UPDATE_ACCOUNT } from '../actions/types'

const initialState = {
	user: {},
	token: localStorage.getItem('token'),	
	isAuthenticated: false,
	loading: false,
}

const authReducer = (state = initialState, action) => {
	switch(action.type) {
		case LOAD_USER: 
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				token: action.payload.token,
				user: action.payload.user,
			}
		case LOGIN_USER:
			localStorage.setItem('token', action.payload.token)
			return {
				...state, 
				loading: false, 
				isAuthenticated: true,
				token: action.payload.token,
				user: action.payload.user,
			}
		case LOGOUT_USER: 
			localStorage.removeItem('token')
			return {
				...state,
				isAuthenticated: false,
				token: "",
				user: null,
			}
		case UPDATE_ACCOUNT: 
			return {
				...state,
				user: {...state.user ,...action.payload},
				loading: false
			}
		case AUTH_LOADING: 
			return {...state, loading: true}
		case UNLOADING:
			return {...state, loading: false}
		default:
			return state
	}
}

export default authReducer