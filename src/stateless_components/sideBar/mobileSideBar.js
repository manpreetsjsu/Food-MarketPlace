import React, { Component } from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import sideMenuBar from './SideBar';

export default class mobileSidebar extends Component {

    constructor(props){
        super(props);
        this.state = { visible: false }
    }


    handleHideClick = () => this.setState({ visible: false })
    handleShowClick = () => {
        this.setState((prevState, props) => {
            return{
                visible: !prevState.visible
            }
        });
    };


    handleSidebarHide = () => this.setState({ visible: false })

    render() {
        const { visible } = this.state;

        return (
            <div>

                {/*here goes gampad icon menu item */}
                <Button.Group>
                    <Button disabled={visible} onClick={this.handleShowClick}>
                        Show sidebar
                    </Button>
                    <Button disabled={!visible} onClick={this.handleHideClick}>
                        Hide sidebar
                    </Button>
                </Button.Group>

                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='push'
                        icon='labeled'
                        inverted
                        onHide={this.handleSidebarHide}
                        vertical
                        visible={visible}
                        width='thin'
                    >


                        {/*here goes sidebar*/}
                        <Menu.Item as='a'>
                            <Icon name='home' />
                            Home
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='gamepad' />
                            Games
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='camera' />
                            Channels
                        </Menu.Item>
                        <sideMenuBar/>


                    </Sidebar>

                    <Sidebar.Pusher>


                        <Segment basic>
                            <Header as='h3'>Application Content</Header>
                            <Image src='/images/wireframe/paragraph.png' />
                        </Segment>
                        {this.props.Children}

                    </Sidebar.Pusher>



                </Sidebar.Pushable>
            </div>
        )
    }
}