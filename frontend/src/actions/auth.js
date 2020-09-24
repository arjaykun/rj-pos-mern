import { AUTH_LOADING, LOGIN_USER, LOGOUT_USER, LOAD_USER, UPDATE_ACCOUNT } from './types'
import axios from 'axios'
import { addErrorMessage, addSuccessMessage } from './messages';
import { createHeader } from './helpers';

const base_url = process.env.BASE_URL || "http://localhost:8000/api/v1"

export const loadUser = () => {
	return async (dispatch, getState) => {
		const { token } = getState().auth
		if(token) {
			dispatch({type: AUTH_LOADING})
			const config = createHeader(token)

			try {
				const user = await axios.get(base_url + '/auth/user', config)
				dispatch({type:LOAD_USER, payload: {user:user.data.user, token: token} })
			} catch(error) {
			 	// window.location.href = '/error'
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
			return true
		} catch(error) {
			 if(!error.response)
			 	return 	window.location.href = '/error_500'
			 addErrorMessage(dispatch, error)
		}

		return false
	}
}

export const register = data => {
	return async dispatch => {
		dispatch({type: AUTH_LOADING})
		try {
			const user = await axios.post(base_url + '/auth/register', data)
			const response = user.data
			dispatch({type: LOGIN_USER, payload: { token: response.token, user: response.user } })
			return true
		} catch(error) {
			addErrorMessage(dispatch, error)
		}

		return false
	}
}

export const updateAccount = user => {
	console.log(user)
	return async (dispatch, getState) => {
		dispatch({ type: AUTH_LOADING })
		try {
			const { token } = getState().auth
			const config = createHeader(token)
			await axios.patch(base_url + `/auth/update/${user._id}/`, user, config)
			addSuccessMessage(dispatch, "Profile updated successfully.")
			dispatch({type: UPDATE_ACCOUNT, payload: user})
		} catch(error) {
			console.log(error)
			addErrorMessage(dispatch, error)
		}
	}
}

export const logout = () => {
	return async dispatch => {
		dispatch({type: LOGOUT_USER})
		addSuccessMessage(dispatch, "You have successfully logged out your account.")
	}
}