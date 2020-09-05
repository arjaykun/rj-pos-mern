import { GET_USERS, ADD_USER, USER_LOADING, CHANGE_USERS_URL, UPDATE_USER, DELETE_USER } from './types'
import axios from 'axios'
import { addErrorMessage, addSuccessMessage } from './messages';
import { createHeader } from './helpers';

const base_url = process.env.BASE_URL || "http://localhost:8000"

export const getUsers = url => {
	return async (dispatch, getState) => {
		dispatch({ type: USER_LOADING })
		try {
			const { token } = getState().auth
			const config = createHeader(token)
			const users = await axios.get(base_url + url, config)	
			dispatch({type: GET_USERS, payload: users.data})
		} catch(error) {
			console.log(error)
		}
	}
}

export const addUser = user => {
	return async (dispatch, getState) => {
		dispatch({ type: USER_LOADING })
		try { 
			const { token } = getState().auth
			const config = createHeader(token)
			const result = await axios.post(base_url + '/users', user, config)
			addSuccessMessage(dispatch, "User added successfully.")
			dispatch({type: ADD_USER, payload: result.data.user})
		} 
		catch(error) {
			addErrorMessage(dispatch, error)
		}
	}
}

export const updateUser = user => {
	return async (dispatch, getState) => {
		dispatch({ type: USER_LOADING })
		try {
			const { token } = getState().auth
			const config = createHeader(token)
			await axios.patch(base_url + '/users/' + user._id, user, config)
			addSuccessMessage(dispatch, "User updated successfully.")
			dispatch({type: UPDATE_USER, payload: user})
		} catch(error) {
			addErrorMessage(dispatch, error)
		}
	}
}

export const deleteUser = userId => {
	return async (dispatch, getState) => {
		dispatch({ type: USER_LOADING })
		try { 
			const { token } = getState().auth
			const config = createHeader(token)
			await axios.delete(base_url + '/users/' + userId)
			addSuccessMessage(dispatch, "User deleted successfully.", config)
			dispatch({type: DELETE_USER, payload: userId})
		} 
		catch(error) {
			addErrorMessage(dispatch, error)
		}
	}
}

export const change_url = queries => {
	return dispatch => {
		dispatch({ type: CHANGE_USERS_URL, payload: queries })
	}
}