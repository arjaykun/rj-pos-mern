import { ADD_ORDER, ORDER_LOADING, GET_ORDERS, CHANGE_ORDERS_URL } from './types';
import axios from 'axios';

export const getOrders = url => {
	return async dispatch => {
		dispatch({ type:ORDER_LOADING })

		try {
			const orders = await axios.get(url)
			dispatch( { type: GET_ORDERS, payload: orders.data })
		} catch(error) {
			console.log(error)
		}
	}
}

export const addOrder = order => {
	return async dispatch => {
		dispatch({ type:ORDER_LOADING })

		try {
			const result = await axios.post('http://localhost:8000/orders', order)
			dispatch({ type: ADD_ORDER, payload: result.data.data})
			return true;
		} catch(error) {
			console.log(error)
		}

		return false;
	}
}

export const change_url = queries => {
	return dispatch => {
		dispatch({ type: CHANGE_ORDERS_URL, payload: queries })
	}
}