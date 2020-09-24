import React from 'react';
import { Link } from 'react-router-dom';
import  { MdHome, MdStoreMallDirectory, MdLock, MdPerson } from "react-icons/md";
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/auth'

const Header = ({logout, shop_name}) => {
	const location = useLocation()

	if(location.pathname === '/login' ||  location.pathname === '/register')
		return null

	return (
		<div className="bg-red-600 text-white p-3">
			<h1 className="bg-gray text-xl font-bold text-center">
				{ shop_name }
			</h1>	
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<div className="mr-4"><Link to="/" className="flex items-center"><MdHome className="mx"/> Home</Link>
					</div>
					<div className="mr-4"><Link to="/profile" className="flex items-center"><MdPerson className="mx"/> Profile</Link>
					</div>
					<div className="mr-4"><Link to="/shop" className="flex items-center"><MdStoreMallDirectory className="mx"/> Shop</Link>
					</div>
					<div className="mr-4"><Link to="/admin" className="flex items-center"><MdLock className="mx"/> Admin</Link>
					</div>
				</div>
				<button 
					className="uppercase text-red-900 font-bold text-base" 
					onClick={ () => logout() }
				>
					Logout 
				</button>
			</div>
		</div>
	)
}
const mapStateToProps = state => ({
	shop_name: state.auth.user && state.auth.user.shop ? state.auth.user.shop.name : 'RJ Shop',
})

export default connect(mapStateToProps, {logout})(Header)