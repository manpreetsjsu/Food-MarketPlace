import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const guestModal = (props) => (
    <Modal trigger={props.children} closeIcon centered={false} size='mini'>
        <Header icon='archive' content='Please Login to Sell Your Item' />
        <Modal.Content>
            <p>
                You currently logged in as Guest !
            </p>
        </Modal.Content>
        <Modal.Actions>
            <Button color='Blue'>
                <Icon name='remove' /> Login
            </Button>
            <Button color='teal'>
                <Icon name='checkmark' /> SignUp
            </Button>
        </Modal.Actions>
    </Modal>
)

export default guestModal
