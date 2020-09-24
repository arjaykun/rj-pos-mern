import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'

const VerifyPassword = ({hideModal}) => {
	const [password, setPassword] = useState('')
	const [confPassword, setConfPassword] = useState('')
	const [oldPassword, setOldPassword] = useState('')
	const [showPwd, setShowPwd] = useState(false)

	const handleClick = () => {
		hideModal()
	}

	return (
		<div className="text-gray-700"> 
			<h1 className="text-2xl font-bold uppercase">Change Your Password</h1>

			<div className="mt-4">
				<label className="uppercase text-base font-bold text-gray-700">New Password</label>
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

			<div className="mt-2">
				<label className="uppercase text-base font-bold text-gray-700">Confirm Password</label>
				<label className="relative">
					<input 
						type={showPwd? 'text':'password'}
						className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-1 text-gray-700 appearance-none focus:outline-none foc
						us:bg-white"
						placeholder="*************"
						value={confPassword}
						onChange={ e => setConfPassword(e.target.value)}
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

			<div className="mt-2">
				<label className="uppercase text-base font-bold text-gray-700">Old Password</label>
				<label className="relative">
					<input 
						type={showPwd? 'text':'password'}
						className="bg-gray-200 border border-gray-200 w-full text-base rounded-lg p-2 mb-1 text-gray-700 appearance-none focus:outline-none foc
						us:bg-white"
						placeholder="*************"
						value={oldPassword}
						onChange={ e => setOldPassword(e.target.value)}
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

			<button 
					className={`btn w-full mb-4 bg-gray-700 flex items-center justify-center hover:bg-gray-600 mt-2`}
					type="submit"
					onClick={handleClick}
					>
					<div className=" uppercase font-bold">Change Password</div>
			</button>
		</div>
	)
}

export default VerifyPassword