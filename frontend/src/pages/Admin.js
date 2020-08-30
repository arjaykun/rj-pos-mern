import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminNav from '../components/admin/AdminNav'
import Dashboard from './Dashboard';
import Items from './Items';
import Categories from './Categories';
import Orders from './Orders';
import Users from './Users';
import OrderDetail from './OrderDetail';

const Admin = () => {
	return (
		<div className="">
			<Router>
				<AdminNav />
				<Switch>
					<Route exact path="/admin" component={Dashboard} />
					<Route exact path="/admin/items" component={Items} />
					<Route exact path="/admin/categories" component={Categories} />
					<Route exact path="/admin/orders" component={Orders} />
					<Route exact path="/admin/orders/:id" component={OrderDetail} />
					<Route path="/admin/users" component={Users} />
				</Switch>
			</Router>
		</div>
	)
}

export default Admin