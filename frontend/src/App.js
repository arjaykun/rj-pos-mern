import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import Header from './pages/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/Profile';
import Error_404 from './pages/Error_404';
import PrivateRoute from './components/utils/PrivateRoute'
import { connect } from 'react-redux'
import { loadUser} from './actions/auth'

const App = ({loadUser}) => {
  

  // if refresh or every mount of whole app
  // we will get token from local storage 
  // if exists logged in the user of the token 
  // if not go back to login page
  useEffect( () => {
    loadUser()
    //eslint-disable-next-line
  }, []) 


  return (
    <div className="w-120 max-w-full mx-auto bg-white h-screen overflow-y-auto">
     <Router>
       <Header />
       <Switch>
         <Route exact path="/login" component={Login} />
         <Route exact path="/register" component={Register} />
         <PrivateRoute exact path="/" component={Home} />    
         <PrivateRoute exact path="/profile" component={Profile} />    
         <PrivateRoute exact path="/shop" component={Shop} />
         <PrivateRoute path="/admin" component={Admin} />     
         <Route component={Error_404} />    
       </Switch>
     </Router>
    </div>
  );
}


export default connect(null, {loadUser})(App);