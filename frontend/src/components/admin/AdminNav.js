import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
	return (
		<nav className="flex justify-center items-center bg-red-500 text-red-800">
				<NavLink
				activeClassName="bg-white" 
				exact
				to="/admin" 
				className="py-3 hover:text-red-900 text-center w-1/4 px-3">Dashboard</NavLink>
			<NavLink
				activeClassName="bg-white" 
				to="/admin/items" 
				className="py-3 hover:text-red-900 text-center w-1/4 px-3">Items</NavLink>
			<NavLink
				activeClassName="bg-white" 
				to="/admin/orders" 
				className="py-3 hover:text-red-900 text-center w-1/4 px-3">Orders</NavLink>
			<NavLink
				activeClassName="bg-white" 
				to="/admin/users" 
				className="py-3 hover:text-red-900 text-center w-1/4 px-3">Users</NavLink>
		</nav>

	)
}

export default AdminNav