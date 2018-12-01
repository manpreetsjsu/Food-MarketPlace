import React, { Component } from 'react';
import './App.css';
import MarketPlace from './stateful_components/MarketPlace';
import NewsFeed from './stateful_components/NewsFeed';
import MyPosts from './stateful_components/UserProfile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withAuthentication from "./withAuthentication";
import LoginModal from "./stateful_components/loginDisplay/loginModal";
import { Provider } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className='app'>
          <Provider store={this.props.store}>
        <Router>
            <Switch>
                <Route path="/" exact component={LoginModal} />
                <Route path='/marketplace' exact component={MarketPlace}/>
                <Route path='/newsfeed' exact component={NewsFeed}/>
                <Route path='/myposts' exact component={MyPosts}/>
            </Switch>
        </Router>
          </Provider>
      </div>
    );
  }
}

export default App;
