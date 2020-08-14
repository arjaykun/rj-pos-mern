import { GET_CATEGORIES, CATEGORIES_LOADING, } from './types';
import axios from 'axios';

export const getCategories = () => {
	return async dispatch => {
		dispatch({ type: CATEGORIES_LOADING })
		try {
			const categories = await axios.get("http://localhost:8000/categories?get=all")
			dispatch({ type: GET_CATEGORIES, payload: categories.data.data})
		} catch(error) {
			window.location.url = './error';
		}
	}
}

