import { CLEAR_MESSAGE, UNLOADING, ADD_MESSAGE } from './types';

export const clear_message = () => {
	return dispatch => {
		dispatch({ type: CLEAR_MESSAGE })
	}
}

export const addSuccessMessage = (dispatch, message) => {
	dispatch({ type: ADD_MESSAGE, payload: { message: message , error: false}})
}

export const addErrorMessage = (dispatch, error) => {
	dispatch({ type: ADD_MESSAGE, payload: { message: error.response.data.msg, error: true}})
	dispatch({ type: UNLOADING })
}