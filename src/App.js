import React from 'react';
import GlobalStyle from './globalStyles';
import Home from './pages/HomePage/Home';
import Services from './pages/Services/Services';
import Products from './pages/Products/Products';
import SignUp from './pages/SignUp/SignUp';
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Application from "./pages/SignUp/Application";
import UserProvider from "./providers/UserProvider";
import { Navbar, Footer } from './components';

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
        <Route path='/Sign-Up' component={SignUp}  />
        
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
