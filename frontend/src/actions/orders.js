import { ADD_ORDER, ORDER_LOADING, GET_ORDERS, CHANGE_ORDERS_URL, UPDATE_ORDER } from './types';
import axios from 'axios';
import { createHeader } from './helpers';

const base_url = process.env.BASE_URL || "http://localhost:8000"

export const getOrders = uri => {
	return async (dispatch, getState) => {
		dispatch({ type:ORDER_LOADING })

		try {
			const { token } = getState().auth
			const config = createHeader(token)
			const orders = await axios.get(base_url + uri, config)
			dispatch( { type: GET_ORDERS, payload: orders.data })
		} catch(error) {
			console.log(error)
		}
	}
}

export const completeOrder = order => {
	return async (dispatch, getState) => {
		dispatch({ type:ORDER_LOADING })
		try {
			const { token } = getState().auth
			const config = createHeader(token)
			const data = {...order, completed: true}
			await axios.patch(base_url + '/orders/' + order._id, data, config)
			dispatch({type: UPDATE_ORDER, payload: data})
			return true;
		} catch(error) {
			console.log(error.response)
		}
		return false;
	}
}

export const addOrder = order => {
	return async (dispatch, getState) => {
		dispatch({ type:ORDER_LOADING })

		try {
			const { token } = getState().auth
			const config = createHeader(token)
			const result = await axios.post(base_url + '/orders', order, config)
			dispatch({ type: ADD_ORDER, payload: result.data.data})
			return true;
		} catch(error) {
			console.log(error.response)
		}

		return false;
	}
}

export const change_url = queries => {
	return dispatch => {
		dispatch({ type: CHANGE_ORDERS_URL, payload: queries })
	}
}