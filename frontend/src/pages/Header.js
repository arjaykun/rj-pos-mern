import React from 'react';
import { Link } from 'react-router-dom';
import  { MdHome, MdStoreMallDirectory, MdLock } from "react-icons/md";
const Header = () => {
	return (
		<div className="bg-red-600 text-white p-3">
			<h1 className="bg-gray text-2xl font-bold text-center">RJ SHOP</h1>	
			<div className="flex justify-center items-center">
				<div className="mx-4"><Link to="/" className="flex items-center"><MdHome className="mx"/> Home</Link></div>
				<div className="mx-4"><Link to="/shop" className="flex items-center"><MdStoreMallDirectory className="mx"/> Shop</Link></div>
				<div className="mx-4"><Link to="/admin" className="flex items-center"><MdLock className="mx"/> Admin</Link></div>
			</div>
		</div>
	)
}

export default Header