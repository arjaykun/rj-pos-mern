import { GET_CATEGORIES, CATEGORIES_LOADING, ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from './types';

import axios from 'axios';
import { addErrorMessage, addSuccessMessage } from './messages';

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
			addSuccessMessage(dispatch, "Category added successfully.")
			dispatch({ type: ADD_CATEGORY, payload:result.data.category })
		} catch (error) {
			addErrorMessage(dispatch, error)
		}
	}
}

export const updateCategory = category => {
	return async dispatch => {
		dispatch({ type: CATEGORIES_LOADING })
		try {
			await axios.patch(base_url + "/categories/" + category._id, category)
			addSuccessMessage(dispatch, "Category updated successfully.")
			dispatch({ type: UPDATE_CATEGORY, payload: category })			
		} catch(error) {
			 addErrorMessage(dispatch, error)
		}
	}
}

export const deleteCategory = category => {
	return async dispatch => {
		dispatch({ type: CATEGORIES_LOADING })
		try {
			await axios.delete(base_url + "/categories/" + category)
			addSuccessMessage(dispatch, "Category deleted successfully.")
			dispatch({ type: DELETE_CATEGORY, payload: category})
		} catch(error) {
			window.location.url = './error';
		}
	}
}



