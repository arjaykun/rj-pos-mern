import { combineReducers } from 'redux';
import ItemsReducer from './ItemsReducer';
import CartReducer from './CartReducer';
import messagesReducer from './messagesReducer';
import shopReducer from './shopReducer';
import categoriesReducer from './categoriesReducer';
import ordersReducer from './ordersReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import salesReducer from './salesReducer';

export default combineReducers({
	items: ItemsReducer,
	cart: CartReducer,
	messages: messagesReducer,
	shop: shopReducer,
	categories: categoriesReducer,
	orders: ordersReducer,
	users: usersReducer,
	auth: authReducer,
	sales: salesReducer,
});