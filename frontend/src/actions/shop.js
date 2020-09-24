import { GET_SHOP_ITEMS, SHOP_ITEMS_LOADING, GET_ALL_ITEMS} from './types'
import axios from 'axios'
import { createHeader } from './helpers';

const base_url = process.env.BASE_URL || "http://localhost:8000/api/v1"

export const getShopItems = () => {
	return async (dispatch, getState) => {
		try {	
			dispatch({type:SHOP_ITEMS_LOADING})
			const { token } = getState().auth
			const config = createHeader(token)
			const res = await axios.get(base_url+"/categories", config)
			dispatch({type:GET_SHOP_ITEMS, payload: res.data})
		} catch(error) {
			// window.location.href = '/error'
		}
		
	}
}

export const getAllItems = () => {
	return async (dispatch, getState) => {
		try {
			const { token } = getState().auth
			const config = createHeader(token)
			const items = await axios.get(base_url + "/items?get=all", config)
			dispatch({ type: GET_ALL_ITEMS, payload: items.data.data})
		} catch(error) {
			window.location.url = './error';
		}
	}
}

