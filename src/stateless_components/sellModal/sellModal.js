import React,{Component} from 'react'
import { Header, Image, Modal,Form } from 'semantic-ui-react'
import SellForm from './sellForm'
import DropDown from '../DropDown/DropDown'

class OpenModal extends Component {

    constructor(props){
        super(props);
        this.state={
            postedItemLocation :  ''
        }
    }

    storeItemLocation=(val)=>{
        this.setState({postedItemLocation: val});
        console.log(val);
    }

    render() {
        return (
            <div>
                <Modal size='small' trigger={this.props.children} centered={false}>
                    <Modal.Header>Item For Sale</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='medium' src={require('../../assets/images/spartan.jpg')}/>
                        <Modal.Description>
                            {<DropDown/>}
                        <br/>
                            {<SellForm location={this.storeItemLocation}/>}
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default OpenModal;