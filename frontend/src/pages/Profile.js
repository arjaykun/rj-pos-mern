import React from 'react'
import { connect } from 'react-redux'
import { MdModeEdit, MdLock, MdSave } from 'react-icons/md'
const Profile = ({user}) => {

	const handleSubmit = () => {}
	const handleChange = () => {}
	return (
		<div className="px-2">
			<h1 className="border-b border-t border-red-900 my-2 font-bold py-2 uppercase text-lg">
				Profile Information
			</h1>

			<form className="py-3" onSubmit={handleSubmit}>

				{/* name field */}
				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					Name
				</label>
				<label className="relative">
					<input 
						type="text"
						className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none focus:bg-white"
						placeholder="His/ her name"
						value={user.name}
						name="name"
						onChange={handleChange} 
						disabled
					/>
					<span className="absolute top-0 right-0 mr-4"><MdModeEdit className="text-gray-700 hover:text-gray-600 cursor-pointer text-xl" /></span>
				</label>


				{/* email field */}
				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					E-mail
				</label>
				<label className="relative">
					<input 
						type="email"
						className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none focus:bg-white"
						placeholder="user@email.com"
						value={user.email}
						name="email"
						onChange={handleChange}
						disabled 
					/>
					<span className="absolute top-0 right-0 mr-4"><MdModeEdit className="text-gray-700 hover:text-gray-600 cursor-pointer text-xl" /></span>
				</label>

				{/* userType field */}
				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					User Type
				</label>
				<label className="relative">
					<input 
						type="text"
						className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none focus:bg-white"
						placeholder="user@email.com"
						value={user.userType}
						disabled 
					/>
				<span className="absolute top-0 right-0 mr-4"><MdLock className="text-gray-700 text-xl" /></span>
				</label>

				{/* password field */}
				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					Password
				</label>
				<label className="relative">
					<input 
						type="password"
						className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none foc
						us:bg-white"
						placeholder="user@email.com"
						value="*************"
						disabled 
					/>
					<span className="absolute top-0 right-0 mr-4"><MdModeEdit className="text-gray-700 hover:text-gray-600 cursor-pointer text-xl" /></span>
				</label>
				
				<button 
					className={`rounded-lg w-full p-2 text-gray-100 mb-4 bg-red-700 flex items-center justify-center hover:bg-red-600`}
					type="submit"
					>
					<div className=" uppercase font-bold">Save </div>
					<MdSave className="ml-2 text-xl text-white" />
					
			</button>

			</form>
		</div>
	)
}
const mapStateToProps = state => ({
	user: state.auth.user
})
export default connect(mapStateToProps)(Profile)