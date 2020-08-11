import { GET_SHOP_ITEMS, SHOP_ITEMS_LOADING } from './types'
import axios from 'axios'
export const getShopItems = () => {
	return async dispatch => {
		dispatch({type:SHOP_ITEMS_LOADING})

		try {	
			const res = await axios.get("http://localhost:8000/categories")
			console.log(res.data)
			dispatch({type:GET_SHOP_ITEMS, payload: res.data})
		} catch(error) {
			window.location.href = '/error'
		}
		
	}
}