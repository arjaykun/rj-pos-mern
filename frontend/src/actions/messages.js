import { CLEAR_MESSAGE } from './types';


export const clear_message = () => {
	return dispatch => {
		dispatch({ type: CLEAR_MESSAGE })
	}
}