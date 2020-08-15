import { GET_SHOP_ITEMS, SHOP_ITEMS_LOADING, GET_ALL_ITEMS} from './types'
import axios from 'axios'

export const getShopItems = () => {
	return async dispatch => {
		dispatch({type:SHOP_ITEMS_LOADING})

		try {	
			const res = await axios.get("http://localhost:8000/categories")
			dispatch({type:GET_SHOP_ITEMS, payload: res.data})
		} catch(error) {
			window.location.href = '/error'
		}
		
	}
}

export const getAllItems = () => {
	return async dispatch => {
		try {
			const items = await axios.get("http://localhost:8000/items?get=all")
			dispatch({ type: GET_ALL_ITEMS, payload: items.data.data})
		} catch(error) {
			window.location.url = './error';
		}
	}
}

