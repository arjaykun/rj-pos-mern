import React, {useState, Fragment} from 'react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { register } from '../../actions/auth'
import Loading from '../../components/utils/Loading'

const Login = ({message, register, auth}) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleRegister = e => {
		e.preventDefault()
		register(name, email, password)
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
								value={name} 
								onChange={ e => setName(e.target.value) }
								placeholder="John Doe"
								className="w-full text-base border-b-2 border-gray-700 outline-none bg-gray-300 focus:bg-white p-2 transition duration-500 rounded-lg mt-2"
							/>
						</div>

						<div className="mb-4">
							<label className="uppercase text-base font-bold text-gray-700">E-mail *</label>
							<input 
								type="email" 
								value={email} 
								onChange={ e => setEmail(e.target.value) }
								placeholder="your@email.com"
								className="w-full text-base border-b-2 border-gray-700 outline-none bg-gray-300 focus:bg-white p-2 transition duration-500 rounded-lg mt-2"
							/>
						</div>

						<div className="mb-4">
							<label className="uppercase text-base font-bold text-gray-700">Password *</label>
							<input 
								type="password" 
								value={password} 
								onChange={ e => setPassword(e.target.value) }
								placeholder="*********"
								className="w-full text-base border-b-2 border-gray-700 outline-none bg-gray-300 focus:bg-white p-2 transition duration-500 rounded-lg mt-2" 
							/>
						</div>

						<button 
							type="submit" 
							className="w-full uppercase bg-red-600 hover:bg-red-500 rounded-lg text-gray-100 p-2"
						>
						LOGIN
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

export default connect(mapStateToProps, {register})(Login)