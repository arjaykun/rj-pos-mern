import { GET_USERS, ADD_USER, USER_LOADING, ADD_MESSAGE, UNLOADING, CHANGE_USERS_URL } from './types'
import axios from 'axios'
import { addErrorMessage } from './messages';

const base_url = process.env.BASE_URL || "http://localhost:8000"

export const getUsers = url => {
	return async dispatch => {
		dispatch({ type: USER_LOADING })
		try {
			const users = await axios.get(base_url + url)
			
			dispatch({type: GET_USERS, payload: users.data})
		} catch(error) {
			console.log(error)
		}
	}
}

export const addUser = user => {
	return async dispatch => {
		dispatch({ type: USER_LOADING })
		try { 
			const result = await axios.post(base_url + '/users', user)
			dispatch({type: ADD_USER, payload: result.user})
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