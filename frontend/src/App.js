import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import Header from './pages/Header';
import Error_404 from './pages/Error_404';

function App() {
  return (
   <Router>
     <Header />
     <Switch>
       <Route exact path="/" component={Home} />
       <Route path="/shop" component={Shop} />
       <Route path="/admin" component={Admin} />  
       <Route component={Error_404} />    
     </Switch>
   </Router>
  );
}
export default App;