import React from 'react';
import { connect } from 'react-redux';

const Home = ({user}) => {
	return (
		<div>
			<h1 className="text-3xl">Welcome back!</h1>
			<div>{user.name}</div>

			<button className="border-green-800 rounded-lg text-base">logout</button>
		</div>
	)
}

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps)(Home)