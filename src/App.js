import './App.css';
import React, { useContext } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {AuthProvider} from './Authentication'
import PrivateRoute from './PrivateRoute'
import  Home from "./Pages/Home.jsx";
import Team from "./Pages/Team.jsx";
import LoginForm from "./Components/LoginForm";
import Navbar from './Components/Nav'
import Roster from './Pages/Roster'
import Signin from './Auth/SignIn'
import Signup from './Auth/SignUp'

function App() {
  return (
    <AuthProvider>
  <Router>
    <Switch>
    <Route path='/signin' component={Signin}/>
      <Route exact path="/signup" component={Signup} />
      <>
      <Navbar/>
      <PrivateRoute  exact path='/' component={Home}/>
      <PrivateRoute path='/team' component={Team}/>
      <Route path='/form' component={LoginForm}/>
      <PrivateRoute path='/roster' component={Roster}/>
      </>
    </Switch>
  </Router>
</AuthProvider>
  );
}

export default App;
