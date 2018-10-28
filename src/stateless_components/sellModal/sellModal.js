import React,{Component} from 'react'
import { Image, Modal } from 'semantic-ui-react'
import SellForm from './sellForm'


class OpenModal extends Component {

    constructor(props){
        super(props);
        this.state={
            postedItemLocation :  ''
        }
    }


    render() {
        return (
            <div>
                <Modal closeIcon={true} closeOnEscape={false} size='small' trigger={this.props.children} centered={false}>
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
    }
}

export default OpenModal;