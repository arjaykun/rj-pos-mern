import { combineReducers } from 'redux';
import ItemsReducer from './ItemsReducer';
import CartReducer from './CartReducer';
import messagesReducer from './messagesReducer';
import shopReducer from './shopReducer';
import categoriesReducer from './categoriesReducer';

export default combineReducers({
	items: ItemsReducer,
	cart: CartReducer,
	messages: messagesReducer,
	shop: shopReducer,
	categories: categoriesReducer,
});