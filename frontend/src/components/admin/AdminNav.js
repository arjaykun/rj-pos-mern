import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
	return (
		<nav className="flex justify-center items-center bg-red-500 text-gray-100 text-xs">
			<NavLink
				activeClassName="bg-white text-gray-700" 
				exact
				to="/admin" 
				className="py-3 text-center w-1/4 px-3">Dashboard</NavLink>
			<NavLink
				activeClassName="bg-white text-gray-700" 
				to="/admin/items" 
				className="py-3 text-center w-1/4 px-3">Items</NavLink>
			<NavLink
				activeClassName="bg-white text-gray-700" 
				to="/admin/categories" 
				className="py-3 text-center w-1/4 px-3">Categories</NavLink>
			<NavLink
				activeClassName="bg-white text-gray-700" 
				to="/admin/orders" 
				className="py-3 text-center w-1/4 px-3">Orders</NavLink>
			<NavLink
				activeClassName="bg-white text-gray-700" 
				to="/admin/users" 
				className="py-3 text-center w-1/4 px-3">Users</NavLink>
		</nav>

	)
}

export default AdminNav