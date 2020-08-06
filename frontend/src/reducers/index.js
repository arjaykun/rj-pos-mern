import { combineReducers } from 'redux';
import ItemsReducer from './ItemsReducer';
import CartReducer from './CartReducer';
import messagesReducer from './messagesReducer';

export default combineReducers({
	items: ItemsReducer,
	cart: CartReducer,
	messages: messagesReducer,
});