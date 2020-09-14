import React, {useState, Fragment, useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { register } from '../../actions/auth'
import Loading from '../../components/utils/Loading'
import { clear_message } from '../../actions/messages'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'

const Login = ({message, register, auth, clear_message}) => {
	const [data, setData] = useState({ name: '', email: '', shop_name: '', password: ''})
	const [showPwd, setShowPwd] = useState(false)
	useEffect( () => {
    return () => clear_message()
    
    // eslint-disable-next-line
	}, [])

	const handleChange = e => {
		e.persist()
		setData( prevState => ({...prevState, [e.target.name]: e.target.value}))
	}

	const handleRegister = e => {
		e.preventDefault()
		register(data)
	}
	
	return (
		<Fragment>
			{ auth.loading ? <Loading /> : null}

			{ auth.isAuthenticated ? <Redirect to="/" /> :
			<div className="w-full h-screen flex justify-center items-center">
			  <div className="w-10/12">
				  <h1 className="text-2xl text-gray-700 font-bold pb-4">
				  	Create An Account! <br />
				  	<small className="text-gray-600 text-base">Enter the information required * to register.</small>
				  </h1>
				  <div className="text-red-500 text-sm font-extrabold pb-2">
				  	{message}
				  </div>	
					<form onSubmit={handleRegister}>

						<div className="mb-4">
							<label className="uppercase text-base font-bold text-gray-700">Name *</label>
							<input 
								type="text" 
								value={data.name} 
								name="name"
								onChange={handleChange}
								placeholder="John Doe"
								className="custom-input focus:bg-white"
							/>
						</div>

						<div className="mb-4">
							<label className="uppercase text-base font-bold text-gray-700">E-mail *</label>
							<input 
								type="email" 
								value={data.email} 
								name="email"
								onChange={handleChange}
								placeholder="your@email.com"
								className="custom-input focus:bg-white"
							/>
						</div>
						
						<div className="mb-4">
							<label className="uppercase text-base font-bold text-gray-700">Shop Name: *</label>
							<input 
								type="text" 
								value={data.shop_name} 
								name="shop_name"
								onChange={handleChange}
								placeholder="Enter your shop name."
								className="custom-input focus:bg-white"
							/>
						</div>						

						<div className="mb-4">
							<label className="uppercase text-base font-bold text-gray-700">Password *</label>
							<label className="relative">
								<input 
									type={showPwd? 'text':'password'}
									value={data.password} 
									name="password"
									onChange={handleChange}
									placeholder="*********"
									className="custom-input focus:bg-white" 
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
							type="submit" 
							className="btn bg-red-600 hover:bg-red-500 w-full"
						>
						Register
						</button>
					</form>
					<div className="pt-5 text-center text-gray-700">
						Already have an account yet? <br />
						<Link to="/login" className="uppercase text-red-700 font-bold">Login here!</Link>
					</div>
				</div>
			</div>
			}
		</Fragment>
	)
}

const mapStateToProps = state => ({
	message: state.messages.message,
	auth: state.auth
})

export default connect(mapStateToProps, {register, clear_message})(Login)