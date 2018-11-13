import React from 'react'
import { Modal } from 'semantic-ui-react'
import SellForm from './sellForm'


const SellModal=(props)=> {

    return (
            <div>
                <Modal closeIcon={true} closeOnEscape={false} size='small' trigger={props.children} centered={false}>
                    <Modal.Header>Item For Sale</Modal.Header>
                    <Modal.Content image>
                        {/*<Image wrapped size='medium' src={require('../../assets/images/spartan.jpg')}/>*/}
                        <Modal.Description>
                            {<SellForm />}

                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        );

};

export default React.memo(SellModal);