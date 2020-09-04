import { GET_ITEMS, ADD_ITEM, ITEMS_LOADING, DELETE_ITEM, UPDATE_ITEM, CHANGE_ITEMS_URL } from './types.js';
import axios from 'axios';
import { addErrorMessage, addSuccessMessage } from './messages';

const base_url = process.env.BASE_URL || "http://localhost:8000"

export const getItems = url => {
	return async dispatch => {
		dispatch({type: ITEMS_LOADING});

		try {	
			const items = await axios.get(base_url + url);
			dispatch({ type: GET_ITEMS, payload: items.data })
		} catch(error) {
			// window.location.href = '/error'
		}
		
	}
}

export const addItem = item => {
	return async dispatch => {
		dispatch({type: ITEMS_LOADING })
		
		try {
			const result = await axios.post(base_url + '/items', item)
			addSuccessMessage(dispatch, "Item added successfully.")
			dispatch({ type: ADD_ITEM, payload:result.data.item })
		} catch(error) {
			addErrorMessage(dispatch, error)
		}

	}
}

export const deleteItem = itemId => {
	return async dispatch => {
		dispatch({type: ITEMS_LOADING});
		try {
			await axios.delete(`${base_url}/items/${itemId}`)
			addSuccessMessage(dispatch, "Item deleted successfully.")
			dispatch({type: DELETE_ITEM, payload: itemId})
		} catch(error) {
			console.log(error)
		}
	}
}

export const updateItem = item => {
	return async dispatch => {
		dispatch({type: ITEMS_LOADING});
		
		try {
			await axios.patch(`${base_url}/items/${item._id}`, item)
			addSuccessMessage(dispatch, "Item updated successfully.")
			dispatch({type: UPDATE_ITEM, payload:item})
		} catch(error) {
			addErrorMessage(dispatch, error)
		}
	}
}

export const change_url = queries => {
	return dispatch => {
		dispatch({ type: CHANGE_ITEMS_URL, payload: queries })
	}
}