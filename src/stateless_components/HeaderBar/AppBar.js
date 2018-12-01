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

        let that = this ;
        if(this.props.accountLoginStatus){
            let user= firebase.auth().currentUser;
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
        }
        else{
            console.log("redirect user to login");
            this.props.guestLogIn();
        }
    };

    // shouldComponentUpdate(nextProps,nextState){
    //     return this.props.accountLoginStatus !== nextProps.accountLoginStatus ;
    // }
    render() {
        const { activeItem } = this.state;
        console.log('render of appbar');
        return (
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
                                name={this.props.accountLoginStatus ? this.props.accountLoginUserInfo.displayName : 'Welcome As Guest'}
                                active={activeItem === ''}
                                onClick={this.handleItemClick} />


                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Button onClick={this.logout} primary> {this.props.accountLoginStatus ? 'Logout' : 'Sign In'} </Button>
                                </Menu.Item>
                            </Menu.Menu>

                        </Menu>
                    )
        )
    }
}

const mapPropsToState=(state)=>{
    return{
            accountLoginStatus: state.accountLogin.status,
            accountLoginUserInfo: state.accountLogin.userInfo,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        memberLogOut:()=>{dispatch(memberLogOut())},
        guestLogIn:()=>{dispatch(guestLogIn())}
    }
};

export default connect( mapPropsToState, mapDispatchToProps)(AppBar);