import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AdminNav from '../components/admin/AdminNav'
import Dashboard from './Dashboard';
import Items from './Items';
import Categories from './Categories';
import Orders from './Orders';
import Users from './Users';
import OrderDetail from './OrderDetail';
import PrivateRoute from '../components/utils/PrivateRoute'
import { connect } from 'react-redux'

const Admin = ({user, history}) => {

	useEffect( () => {
		if(user.userType === 'user')
			history.push('/error_403')
		// eslint-disable-next-line
	}, [])

	return (
		<div className="">
			<Router>
				<AdminNav />
				<Switch>
					<PrivateRoute exact path="/admin" component={Dashboard} />
					<PrivateRoute path="/admin/items" component={Items} />
					<PrivateRoute path="/admin/categories" component={Categories} />
					<PrivateRoute exact path="/admin/orders" component={Orders} />
					<PrivateRoute path="/admin/orders/:id" component={OrderDetail} />
					<PrivateRoute path="/admin/users" component={Users} />
				</Switch>
			</Router>
		</div>
	)
}

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps)(Admin)