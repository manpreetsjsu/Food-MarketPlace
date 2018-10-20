import React,{Component} from 'react'
import { Header, Image, Modal,Form } from 'semantic-ui-react'

class OpenModal extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Modal trigger={this.props.children} centered={false}>
                    <Modal.Header>hi</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='medium' src=''/>
                        <Modal.Description>
                            <Header>title</Header>
                            <Form>
                                <Form.Field>
                                    <label>Title of Your Post</label>
                                    <input/>
                                </Form.Field>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default OpenModal;