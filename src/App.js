import React, { Component } from 'react';
import './App.css';
import LandingPage from './stateful_components/landingPage/landingpage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withAuthentication from "./withAuthentication";
import LoginModal from "./stateful_components/loginDisplay/loginModal";

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Router>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path='/home' component={withAuthentication(LandingPage)}/>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
