import { ADD_ORDER, ORDER_LOADING } from './types';
import axios from 'axios';

export const getOrders = () => {
	return async dispatch => {
		dispatch({ type:ORDER_LOADING })

		try {
			const orders = await axios.get('http://localhost:8000/orders')
			console.log(orders.data)
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
			console.log(result.data.msg)
		} catch(error) {
			console.log(error)
		}
	}
}