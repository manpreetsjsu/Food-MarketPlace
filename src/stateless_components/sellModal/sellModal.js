import React,{Component} from 'react'
import {Modal,} from 'semantic-ui-react'
import SellForm from './sellForm'


class SellModal extends Component {

    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        }
    }

    componentDidUpdate(prevProps,prevState,snapShot){
        console.log("[SellModal.js componentDidUpdate]");
        console.log(prevProps);
        console.log(this.props);
        if(prevProps.isModalOpen !== this.props.isModalOpen){
            console.log("opening sell modal...");
            this.setState({isModalOpen:true},()=>console.log("sell form opened"));
        }
    }
    handleClose=()=>{
        console.log("closing sell form");
      this.setState({isModalOpen:false},()=>console.log(this.state));
    };

    render(){
        console.log('[SellModal.js render]');
        return (
            <>
                <Modal isModalOpen={this.state.isModalOpen} size="small" closeOnEscape={false}  trigger={this.props.children} centered={false} closeOnDimmerClick={true}>
                    <Modal.Actions>
                        {/*<Button color='grey' onClick={this.handleClose} >*/}
                            {/*<Icon name="close"/>Close*/}
                        {/*</Button>*/}
                    </Modal.Actions>

                    <Modal.Header>Item For Sale</Modal.Header>
                    <Modal.Content image>
                        {/*<Image wrapped size='medium' src={require('../../assets/images/spartan.jpg')}/>*/}
                        <Modal.Description>
                            {<SellForm {...this.props}/>}

                        </Modal.Description>
                    </Modal.Content>

                </Modal>
            </>
        );
    }


};



export default React.memo(SellModal);