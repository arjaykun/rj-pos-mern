import { GET_CATEGORIES, CATEGORIES_LOADING, ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY, ADD_MESSAGE, UNLOADING } from './types';
import axios from 'axios';

const base_url = process.env.BASE_URL || "http://localhost:8000"

export const getCategories = () => {
	return async dispatch => {
		dispatch({ type: CATEGORIES_LOADING })
		try {
			const categories = await axios.get(base_url + "/categories?get=all")
			dispatch({ type: GET_CATEGORIES, payload: categories.data.data})
		} catch(error) {
			window.location.url = './error';
		}
	}
}

export const addCategory = category => {
	return async dispatch => {
		dispatch({ type: CATEGORIES_LOADING })
		try {
			const result = await axios.post(base_url + "/categories", category);
			dispatch({ type: ADD_CATEGORY, payload:result.data.category })
			dispatch({ type: ADD_MESSAGE, payload: {message: "Success! Category added successfully.", error:false}})
		} catch (error) {
			dispatch({ type: ADD_MESSAGE, payload: { message: error.response.data.msg, error: true}})
			dispatch({ type: UNLOADING })
		}
	}
}

export const updateCategory = category => {
	return async dispatch => {
		dispatch({ type: CATEGORIES_LOADING })
		try {
			await axios.patch(base_url + "/categories/" + category._id, category)
			dispatch({ type: UPDATE_CATEGORY, payload: category })	
			dispatch({ type: ADD_MESSAGE, payload: {message: "Success! Category updated successfully.", error:false}})
		
		} catch(error) {
			 dispatch({ type: ADD_MESSAGE, payload: { message: error.response.data.msg, error: true}})
			 dispatch({ type: UNLOADING })
		}
	}
}

export const deleteCategory = category => {
	return async dispatch => {
		dispatch({ type: CATEGORIES_LOADING })
		try {
			await axios.delete(base_url + "/categories/" + category)
			dispatch({ type: DELETE_CATEGORY, payload: category})
			dispatch({ type: ADD_MESSAGE, payload: {message: "Success! Category deleted successfully.", error:false}})
		} catch(error) {
			window.location.url = './error';
		}
	}
}



