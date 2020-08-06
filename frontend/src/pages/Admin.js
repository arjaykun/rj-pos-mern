import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminNav from '../components/admin/AdminNav'
import Dashboard from './Dashboard';
import Items from './Items';
import Orders from './Orders';
import Users from './Users';

const Admin = () => {
	return (
		<div className="">
			<Router>
				<AdminNav />
				<Switch>
					<Route exact path="/admin" component={Dashboard} />
					<Route exact path="/admin/items" component={Items} />
					<Route path="/admin/orders" component={Orders} />
					<Route path="/admin/users" component={Users} />
				</Switch>
			</Router>
		</div>
	)
}

export default Admin