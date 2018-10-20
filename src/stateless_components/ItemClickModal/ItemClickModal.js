import React from 'react'
import { Header, Image, Modal } from 'semantic-ui-react'
import ItemCard from '../feed_post/Card_MaterialUI'

const OpenModal = (props) => {
    return (
        <div>
            <Modal trigger={props.children} centered={false}>
                <Modal.Header>{props.header}</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src= {props.img} />
                    <Modal.Description>
                        <Header>{props.title}</Header>
                        <p>{props.info}</p>
                        <p>{props.extraInfo}</p>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div>
    );
}

export default OpenModal;