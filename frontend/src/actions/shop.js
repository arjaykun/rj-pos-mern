import { GET_SHOP_ITEMS, SHOP_ITEMS_LOADING, GET_ALL_ITEMS} from './types'
import axios from 'axios'

const base_url = process.env.BASE_URL || "http://localhost:8000"

export const getShopItems = () => {
	return async dispatch => {
		dispatch({type:SHOP_ITEMS_LOADING})

		try {	
			const res = await axios.get(base_url+"/categories")
			dispatch({type:GET_SHOP_ITEMS, payload: res.data})
		} catch(error) {
			window.location.href = '/error'
		}
		
	}
}

export const getAllItems = () => {
	return async dispatch => {
		try {
			const items = await axios.get(base_url + "/items?get=all")
			dispatch({ type: GET_ALL_ITEMS, payload: items.data.data})
		} catch(error) {
			window.location.url = './error';
		}
	}
}

