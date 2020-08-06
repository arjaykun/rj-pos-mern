import { CART_LOADING, ADD_CART_ITEM } from './types';

export const addItemInCart = (item, discount, total, isDine) => {
	return dispatch => {
		dispatch({type: CART_LOADING})

		setTimeout( () => {
			dispatch({type: ADD_CART_ITEM, payload: {
				item, discount, total, isDine,
			}})
		}, 1000)
	}
}