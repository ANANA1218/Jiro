import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import Profile from './views/Profile';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ResetPassword from './components/Auth/ResetPassword';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './views/NotFound';
import BoardList from './components/BoardList';
import Dashboard from './views/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>JIRO</h1>
      <Router>
        <Navbar />
        <div className="main-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/profile" component={Profile} />
            <Route path="/boards" component={BoardList} />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

