import React, {useState, Fragment, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { login } from '../../actions/auth'
import Loading from '../../components/utils/Loading'
import { clear_message } from '../../actions/messages'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'
const Login = ({login, messages, auth, location, clear_message}) => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPwd, setShowPwd] = useState(false)

	useEffect( () => {
    	return () => clear_message()

    	// eslint-disable-next-line
	}, [])

	const handleLogin = e => {
		e.preventDefault()
		const res = login(email, password)
		if(res) {
			setEmail('')
			setPassword('')
		}
	}

	return (
		<Fragment>
			{ auth.loading ? <Loading /> : null}

			{ auth.isAuthenticated ? <Redirect to="/" /> :
			<div className="flex justify-center items-center h-screen w-full">
			  <div className="w-10/12">
				  <h1 className="text-2xl text-gray-700 font-bold pb-4">
				  	Welcome to RJ SHOP! <br />
				  	<small className="text-gray-600 text-base">Enter your credentials to continue.</small>
				  </h1>	
				  <div className={`text-${messages.error ? 'red': 'green'}-500 text-sm font-extrabold pb-2`}>
				  	{messages.message}
				  </div>
					<form onSubmit={handleLogin}>
						<div className="mb-4">
							<label className="uppercase text-base font-bold text-gray-700">E-mail</label>
							<input 
								type="email" 
								value={email} 
								onChange={ e => setEmail(e.target.value) }
								placeholder="your@email.com"
								className="custom-input focus:bg-white" 
							/>
						</div>

						<div className="mb-4">
							<label className="uppercase text-base font-bold text-gray-700">Password</label>
							<label className="relative">
								<input 
									type={showPwd? 'text':'password'}
									value={password} 
									onChange={ e => setPassword(e.target.value) }
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
							className="btn bg-gray-700 hover:bg-gray-600 w-full"
						>
						LOGIN
						</button>
					</form>
					<div className="pt-5 text-center text-gray-700">
						Does not have an account yet? <br />
						<Link to="/register" className="uppercase text-red-700 font-bold">Register here!</Link>
					</div>
				</div>
			</div>
			}
		</Fragment>
	)
}

const mapStateToProps = state => ({
	messages: state.messages, 
	auth: state.auth,
})

export default connect(mapStateToProps, { login, clear_message })(Login)