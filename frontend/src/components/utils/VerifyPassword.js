import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'

const VerifyPassword = ({data, action, hideModal}) => {
	const [password, setPassword] = useState('')
	const [showPwd, setShowPwd] = useState(false)

	const handleClick = () => {
		action({...data, password})
		hideModal()
	}

	return (
		<div className="text-gray-700"> 
			<h1 className="text-2xl font-bold uppercase">Verify Password</h1>
			<div className="mt-4">
				<label className="uppercase text-base font-bold text-gray-700">Password</label>
				<label className="relative">
					<input 
						type={showPwd? 'text':'password'}
						className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-1 text-gray-700 appearance-none focus:outline-none foc
						us:bg-white"
						placeholder="*************"
						value={password}
						onChange={ e => setPassword(e.target.value)}
					/>
					<span 
						className="absolute top-0 right-0 mr-4 cursor-pointer"
						onClick={ () => setShowPwd( prevState => !prevState )}
					>
						{ showPwd ? 
							 <FaRegEyeSlash className="text-lg font-bold text-gray-700" />:
							 <FaRegEye className="text-lg font-bold text-gray-700" />
						}
					</span>
				</label>
			</div>
			<small className="text-sm italic text-gray-600 mb-2">
				Please enter your password to update your account.
			</small>

			<button 
					className={`btn w-full mb-4 bg-gray-700 flex items-center justify-center hover:bg-gray-600`}
					type="submit"
					onClick={handleClick}
					>
					<div className=" uppercase font-bold">Proceed</div>
			</button>
		</div>
	)
}

export default VerifyPassword