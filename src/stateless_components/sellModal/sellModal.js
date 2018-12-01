import React,{PureComponent} from 'react'
import {Modal,Button} from 'semantic-ui-react'
import SellForm from './sellForm'


class SellModal extends PureComponent {

    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        }
    }

    // shouldComponentUpdate(nextProps,nextState){
    //     return this.props.ismodalopen !== nextProps.ismodalopen || this.state.open !== nextState.open ;
    // }

    componentDidUpdate(prevProps,prevState,snapShot){
        console.log("[SellModal.js componentDidUpdate]");
        console.log(prevProps);
        console.log(this.props);
        if(prevProps.ismodalopen !== this.props.ismodalopen){
            console.log("opening sell modal...");
            this.setState({open:true},()=>console.log("sell form opened"));
        }
    }

    componentWillUnmount() {
        console.log('[sellModal.js componentWillUnmount]');
    }
    handleClose=()=>{
        console.log("closing sell form");
        this.setState({open:false},()=>console.log(this.state));
    };



    render(){
        console.log('[SellModal.js render]');
        return (
            <>
                <Modal open={this.state.open} size="small" closeOnEscape={false}  trigger={this.props.children} centered={false} closeOnDimmerClick={true}>
                    <Modal.Actions>
                        <Button color='grey' onClick={this.handleClose} >
                            Close
                        </Button>
                    </Modal.Actions>

                    <Modal.Header>Item For Sale</Modal.Header>
                    <Modal.Content image>
                        {/*<Image wrapped size='medium' src={require('../../assets/images/spartan.jpg')}/>*/}
                        <Modal.Description>
                            {<SellForm closeSellModal={this.handleClose} {...this.props}/>}

                        </Modal.Description>
                    </Modal.Content>

                </Modal>
            </>
        );
    }


};



export default (SellModal);