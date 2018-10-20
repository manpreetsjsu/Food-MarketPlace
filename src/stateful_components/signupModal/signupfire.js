import React, { Component } from 'react';
import './loginModal.css';
import fire from '../loginDisplay/fire';
import Home from './Home';
import Login from './loginModal';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            user: null,
        });
        this.authListener = this.authListener.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            console.log(user);
            if (user) {
                this.setState({ user });
                // localStorage.setItem('user', user.uid);
            } else {
                this.setState({ user: null });
                //localStorage.removeItem('user');
            }
        });
    }
    render() {
        return (
            <div></div>
        );
    }
}

export default Login;