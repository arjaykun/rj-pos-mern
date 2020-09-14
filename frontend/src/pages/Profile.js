import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { MdModeEdit, MdLock, MdSave } from 'react-icons/md'
import { updateAccount } from '../actions/auth'
import Loading from '../components/utils/Loading'
import Modal from '../components/utils/Modal'
import AlertMessage from '../components/utils/AlertMessage'
import VerifyPassword from '../components/utils/VerifyPassword'

const Profile = ({user, updateAccount, loading, messages}) => {
	const [profile, setProfile] = useState({_id: '',name:'', email: '', userType: '', shop: { name: '', address:'', description: ''}})
	const [showModal, setShowModal] = useState(false)

	useEffect(() =>{
		setProfile({
			_id: user._id,
			name: user.name,
			email: user.email,
			userType: user.userType,
			shop: user.shop,
		})
	}, [user])

	const handleChange = e => {
		e.persist()
		setProfile( prevState => ({...prevState, [e.target.name]:e.target.value }) )
	}

	const handleChangeShop = e => {
		e.persist()
		setProfile( prevState => ({...prevState, shop: {...prevState.shop, [e.target.name]: e.target.value} }))
	}

	const handleUpdate = e => {
		e.preventDefault()
		setShowModal(true)
	}

	return (
		<div className="px-2">

			{ loading ? <Loading /> : null}

			<Modal show={showModal} hideModal={ () => setShowModal(false) } >
				<VerifyPassword action={updateAccount} data={profile} hideModal={() => setShowModal(false)} />
			</Modal>

			<h1 className="border-b border-t border-red-900 my-2 font-bold py-2 uppercase text-lg">
				<span> Profile Information </span>
			</h1>

			{ messages.message ? 
					<AlertMessage messages={messages} /> : null
			}

			<form className="py-3">

				{/* name field */}
				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					Name
				</label>
				<input 
					type="text"
					className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none focus:bg-white"
					placeholder="His/ her name"
					value={profile.name}
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
					value={profile.email}
					name="email"
					onChange={handleChange}
				/>

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

				<h1 className="border-b border-t border-red-900 my-2 font-bold py-2 uppercase text-lg">
					<span> Shop Information </span>
				</h1>

				{/* shop name field */}
				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					Shop Name
				</label>
				<input 
					type="text"
					className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none focus:bg-white"
					value={profile.shop.name}
					name="name"
					onChange={handleChangeShop} 
				/>

				{/* shop address field */}
				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					Address/ Location
				</label>
				<input 
					type="text"
					className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none focus:bg-white"
					value={profile.shop.address}
					name="address"
					onChange={handleChangeShop} 
				/>

				{/* shop description field */}
				<label className="mb-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
					Description
				</label>
				<textarea 
					type="text"
					className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-4 text-gray-700 appearance-none focus:outline-none focus:bg-white"
					value={profile.shop.description}
					name="description"
					onChange={handleChangeShop} 
				/>

				
				<button 
					className={`btn w-full mb-4 bg-red-700 flex items-center justify-center hover:bg-red-600`}
					type="submit"
					onClick={handleUpdate}
					>
					<div className=" uppercase font-bold">Save </div>
					<MdSave className="ml-2 text-xl text-white" />
					
			</button>

			</form>
		</div>
	)
}
const mapStateToProps = state => ({
	user: state.auth.user,
	loading: state.auth.loading, 
	messages: state.messages
})
export default connect(mapStateToProps, {updateAccount})(Profile)