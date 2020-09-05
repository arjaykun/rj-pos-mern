import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import Header from './pages/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Error_404 from './pages/Error_404';
import PrivateRoute from './components/utils/PrivateRoute'
import { connect } from 'react-redux'
import { loadUser} from './actions/auth'

const App = ({loadUser}) => {
  
  useEffect( () => {
    loadUser()
    //eslint-disable-next-line
  }, []) 

  return (
   <Router>
     <Header />
     <Switch>
       <Route exact path="/login" component={Login} />
       <Route exact path="/register" component={Register} />
       <PrivateRoute exact path="/" component={Home} />    
       <PrivateRoute exact path="/shop" component={Shop} />
       <PrivateRoute exact path="/admin" component={Admin} />     
       <Route component={Error_404} />    
     </Switch>
   </Router>
  );
}
export default connect(null, {loadUser})(App);