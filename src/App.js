import React from 'react';
import GlobalStyle from './globalStyles';
import './App.css';
import Home from './pages/HomePage/Home';
import Services from './pages/Services/Services';
import Products from './pages/Products/Products';
import SignUp from './pages/userint/SignUp';
import SignIn from './pages/userint/SignIn';
import ProfilePage from './pages/userint/ProfilePage';

import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Application from "./pages/userint/Application";
import UserProvider from "./providers/UserProvider";
import { Navbar, Footer } from './components';

import CustomerList from './pages/Products/CustomerList';
import CustomerEdit from './pages/Products/CustomerEdit';
import CategoryList from './pages/Services/CategoryList';
import CategoryEdit from './pages/Services/CategoryEdit';




function App() {
  return (
   
    <Router>
      <GlobalStyle />
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/services' component={Services} />
        <Route path='/products' component={Products} />
       
        <Route path='/customers' exact={true} component={CustomerList}/>
        <Route path='/customers/:key' component={CustomerEdit}/>
        <Route path='/categories' exact={true} component={CategoryList}/>
        <Route path='/categories/:key' component={CategoryEdit}/>
       
        <UserProvider>
      <Application />
      
    </UserProvider>

      
        
      
         
      </Switch>
      <Footer />
    </Router>
  );
}

//   <Route path='/Sign-Up' component={Application}  />
export default App;
