import React, { Component } from 'react'
import { Icon, Menu,Button } from 'semantic-ui-react'
import {LoggedInContext} from '../../Context/LoggedInContext';
import firebase from "firebase";
import fire from '../../firebase/fire';
export default class AppBar extends Component {

    state = { activeItem: 'gamepad' }



    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
                                name={userLoginInfo.status ? userLoginInfo.userInfo.displayName : 'Welcome Guest'}
                                active={activeItem === ''}
                                onClick={this.handleItemClick} />


                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Button primary> {userLoginInfo.status ? 'Logout' : 'Sign In'} </Button>
                                </Menu.Item>
                            </Menu.Menu>

                        </Menu>
                    )}

            </LoggedInContext.Consumer>
        )
    }
}