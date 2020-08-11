import { GET_ITEMS, ADD_ITEM, ITEMS_LOADING, DELETE_ITEM, UPDATE_ITEM, CHANGE_ITEMS_URL, ADD_MESSAGE, UNLOADING } from './types.js';
import axios from 'axios';

export const getItems = url => {
	return async dispatch => {
		dispatch({type: ITEMS_LOADING});

		try {	
			const items = await axios.get(url);
			dispatch({ type: GET_ITEMS, payload: items.data })
		} catch(error) {
			window.location.href = '/error'
		}
		
	}
}

export const addItem = item => {
	return async dispatch => {
		dispatch({type: ITEMS_LOADING })
		
		try {
			const result = await axios.post('http://localhost:8000/items', item)
			dispatch({ type: ADD_ITEM, payload:result.data.item })
			dispatch({ type: ADD_MESSAGE, payload: {message: "Success! Item added successfully.", error:false}})
		} catch(error) {
			dispatch({ type: ADD_MESSAGE, payload: { message: error.response.data.msg, error: true}})
			dispatch({ type: UNLOADING })
		}

	}
}

export const deleteItem = itemId => {
	return async dispatch => {
		dispatch({type: ITEMS_LOADING});
		try {
			await axios.delete(`http://localhost:8000/items/${itemId}`)
			dispatch({type: DELETE_ITEM, payload: itemId})
			dispatch({ type: ADD_MESSAGE, payload:  {message: "Success! Item deleted successfully.", error:false} })
		} catch(error) {
			console.log(error)
		}
	}
}

export const updateItem = item => {
	return async dispatch => {
		dispatch({type: ITEMS_LOADING});
		
		try {
			await axios.patch(`http://localhost:8000/items/${item._id}`, item)
			dispatch({type: UPDATE_ITEM, payload:item})
			dispatch({ type: ADD_MESSAGE, payload:  {message: "Success! Item updated successfully.", error:false} })
		} catch(error) {
			dispatch({ type: ADD_MESSAGE, payload: { message: error.response.data.msg, error: true}})
			dispatch({ type: UNLOADING })
		}
	}
}

export const change_url = queries => {
	return dispatch => {
		dispatch({ type: CHANGE_ITEMS_URL, payload: queries })
	}
}