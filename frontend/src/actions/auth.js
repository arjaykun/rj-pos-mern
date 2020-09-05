import { AUTH_LOADING, LOGIN_USER, LOGOUT_USER, LOAD_USER } from './types'
import axios from 'axios'
import { addErrorMessage } from './messages';
import { createHeader } from './helpers';

const base_url = process.env.BASE_URL || "http://localhost:8000"

export const loadUser = () => {
	return async (dispatch, getState) => {
		const { token } = getState().auth
		if(token) {
			dispatch({type: AUTH_LOADING})
			const config = createHeader(token)

			try {
				const user = await axios.get(base_url + '/auth/user', config)
				dispatch({type:LOAD_USER, payload: {user:user.data, token: token} })
			} catch(error) {
			 	window.location.href = '/error'
			} 
		}
	}
}

export const login = (email, password) => {
	return async dispatch => {
		dispatch({type: AUTH_LOADING})
		try {
			const user = await axios.post(base_url + '/auth/login', {email, password})
			const data = user.data
			dispatch({type: LOGIN_USER, payload: { token: data.token, user: data.user } })
		} catch(error) {
			addErrorMessage(dispatch, error)
		}
	}
}

export const register = (name, email, password) => {
	return async dispatch => {
		dispatch({type: AUTH_LOADING})
		try {
			const user = await axios.post(base_url + '/auth/register', {name, email, password})
			console.log(user) 
		} catch(error) {
			addErrorMessage(dispatch, error)
		}
	}
}

export const logout = () => {
	return async dispatch => {
		dispatch({type: LOGOUT_USER})
	}
}