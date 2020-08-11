import { combineReducers } from 'redux';
import ItemsReducer from './ItemsReducer';
import CartReducer from './CartReducer';
import messagesReducer from './messagesReducer';
import shopReducer from './shopReducer';

export default combineReducers({
	items: ItemsReducer,
	cart: CartReducer,
	messages: messagesReducer,
	shop: shopReducer,
});