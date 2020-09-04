import React, { useState, useEffect } from 'react';
import { MdSave } from "react-icons/md";
import AlertMessage from '../utils/AlertMessage';
import { connect } from 'react-redux'
import {addUser, updateUser} from '../../actions/users'

const UserForm = ({operation, messages, loading, hideModal, addUser, updateUser, userData}) => {

	const [user, setUser] = useState({ name: '', email:'', userType: 'user', password: ''})
	
	useEffect( () => {
		if(!loading && !messages.error) 
			hideModal()
	
		// eslint-disable-next-line
	}, [loading])

	useEffect( () => {
		setUser(userData)
	}, [userData])

	const handleChange = e => {
		e.persist()
		setUser(prevState => ({...prevState, [e.target.name]: e.target.value }))
	}
		
	const handleSubmit = e =>{
		e.preventDefault()
		if(operation === 'add')
			addUser(user)
		else if(operation === 'edit')
			updateUser(user)
	}
	return (
		<div>
			<h1 className="text-xl pb-3 text-gray-700">
				{ operation === 'add'? 'Add New User' : 'Edit User'}
			</h1>
			{ messages && messages.error ? <AlertMessage messages={messages} /> : null }
			<form className="py-3" onSubmit={handleSubmit}>

				{/* name field */}
				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					Name
				</label>
				<input 
					type="text"
					className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none focus:bg-white"
					placeholder="His/ her name"
					value={user.name}
					name="name"
					onChange={handleChange} 
				/>


				{/* email field */}
				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					E-mail
				</label>
				<input 
					type="email"
					className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none focus:bg-white"
					placeholder="user@email.com"
					value={user.email}
					name="email"
					onChange={handleChange} 
				/>

			{/* password field */}
			{
				operation === "add" ?
				<div>
				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					Password
				</label>
				<input 
					type="password"
					className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none focus:bg-white"
					placeholder="At least 6 characters"
					value={user.password}
					name="password"
					onChange={handleChange} 
				/>
				</div>
				: null
			}

			{/* usertype field */}
				<div className="relative mb-3">
	        <select 
	        	className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-2 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
	        	value={user.userType}
						name="userType"
						onChange={handleChange} 
	        >
	        	<option disabled value="">Select Position</option>
	          <option value="user">User</option>
	          <option value="admin">Admin</option>
	        </select>
	        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
	          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
	        </div>
	      </div>

				<button 
					className={`rounded-lg w-full p-2 text-gray-100 mb-4 ${loading? 'bg-gray-500' : 'bg-red-700 hover:bg-red-500 '}`}
					type="submit"
					disabled={loading}
					>
				
					<span  className="w-full flex justify-center"><MdSave /></span> 

				</button>
			</form>
		</div>
	)
}



export default connect(null, {addUser, updateUser})(UserForm)