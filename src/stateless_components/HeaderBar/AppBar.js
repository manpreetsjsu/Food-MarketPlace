import React, { Component } from 'react'
import { Icon, Menu,Button } from 'semantic-ui-react'
import {LoggedInContext} from '../../Context/LoggedInContext';
import firebase from "firebase";
import {guestLogIn} from "../../Redux/actions/guestLoginAction";
import {memberLogOut} from "../../Redux/actions/accountLoginAction";
import connect from "react-redux/es/connect/connect";


class AppBar extends Component {

    state = { activeItem: 'gamepad' };



    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    logout=()=>{
        let user= firebase.auth().currentUser;
        let that = this ;
        if(user){
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                console.log("sign out success");
                that.props.memberLogOut();
            }).catch(function(error) {
                // An error happened.
                console.log("sign out fail");
                console.log(error);
            });
        }
        else{
            console.log("redirect user to login");
            this.props.guestLogIn();
        }
    };
    render() {
        const { activeItem } = this.state;
        console.log('render of appbar');
        return (
            <LoggedInContext.Consumer>
                {userLoginInfo =>
                    (
                        <Menu inverted >

                            <Menu.Item>
                            </Menu.Item>

                            <Menu.Item name='gamepad'
                                       active={activeItem === 'gamepad'}
                                       onClick={this.handleItemClick}>
                                <Icon name='gamepad' />
                            </Menu.Item>

                            <Menu.Item
                                name={userLoginInfo.status ? userLoginInfo.userInfo.displayName : 'Welcome As Guest'}
                                active={activeItem === ''}
                                onClick={this.handleItemClick} />


                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Button onClick={this.logout} primary> {userLoginInfo.status ? 'Logout' : 'Sign In'} </Button>
                                </Menu.Item>
                            </Menu.Menu>

                        </Menu>
                    )}

            </LoggedInContext.Consumer>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        memberLogOut:()=>{dispatch(memberLogOut())},
        guestLogIn:()=>{dispatch(guestLogIn())}
    }
};

export default connect( '', mapDispatchToProps)(AppBar);