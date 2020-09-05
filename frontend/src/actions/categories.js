import { GET_CATEGORIES, CATEGORIES_LOADING, ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from './types';

import axios from 'axios';
import { addErrorMessage, addSuccessMessage } from './messages';
import { createHeader } from './helpers';

const base_url = process.env.BASE_URL || "http://localhost:8000"

export const getCategories = () => {
	return async (dispatch, getState) => {
		dispatch({ type: CATEGORIES_LOADING })
		try {
			const { token } = getState().auth
			const config = createHeader(token)
			const categories = await axios.get(base_url + "/categories?get=all", config)
			dispatch({ type: GET_CATEGORIES, payload: categories.data.data})
		} catch(error) {
			window.location.url = './error';
		}
	}
}

export const addCategory = category => {
	return async (dispatch, getState) => {
		dispatch({ type: CATEGORIES_LOADING })
		try {
			const { token } = getState().auth
			const config = createHeader(token)
			const result = await axios.post(base_url + "/categories", category, config);
			addSuccessMessage(dispatch, "Category added successfully.")
			dispatch({ type: ADD_CATEGORY, payload:result.data.category })
		} catch (error) {
			addErrorMessage(dispatch, error)
		}
	}
}

export const updateCategory = category => {
	return async (dispatch, getState) => {
		dispatch({ type: CATEGORIES_LOADING })
		try {
			const { token } = getState().auth
			const config = createHeader(token)
			await axios.patch(base_url + "/categories/" + category._id, category, config)
			addSuccessMessage(dispatch, "Category updated successfully.")
			dispatch({ type: UPDATE_CATEGORY, payload: category })			
		} catch(error) {
			 addErrorMessage(dispatch, error)
		}
	}
}

export const deleteCategory = category => {
	return async (dispatch, getState) => {
		dispatch({ type: CATEGORIES_LOADING })
		try {
			const { token } = getState().auth
			const config = createHeader(token)
			await axios.delete(base_url + "/categories/" + category, config)
			addSuccessMessage(dispatch, "Category deleted successfully.")
			dispatch({ type: DELETE_CATEGORY, payload: category})
		} catch(error) {
			window.location.url = './error';
		}
	}
}



