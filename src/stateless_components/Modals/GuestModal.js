import React,{Component} from 'react';
import {Modal,Button} from "semantic-ui-react";
import {guestLogIn} from "../../Redux/actions/guestLoginAction";

class GuestPopUpModal extends Component{

    constructor(props){
        super(props);
        this.state={
            isOpen:false
        };
    }

    handleSignIn=()=>{
        console.log(this.props);
        this.props.dispatch(guestLogIn()); //dispatch sign In
        this.props.history.push('/');
    };
    handleClose=()=>{
        this.setState({isOpen:false})
    };

    componentDidUpdate(prevProps,prevState,snapShot){
        if(prevProps.isOpen !== this.props.isOpen){
            this.setState({isOpen:true})
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        return this.state.isOpen !== nextState.isOpen || nextProps.isOpen !== this.props.isOpen ;
    }
    render(){
        console.log("my post cliced");
        return(
            <Modal basic size={"tiny"} open={this.state.isOpen} trigger={this.props.children} onClose={this.handleClose} centered={false} closeIcon={true}>
                <Modal.Header> Please Sign In Below</Modal.Header>
                <Modal.Content>
                    <p>{this.props.content}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.handleSignIn} positive icon='login' labelPosition='right' content='Sign In Here' />
                </Modal.Actions>
            </Modal>
        )
    }

}

export default GuestPopUpModal;