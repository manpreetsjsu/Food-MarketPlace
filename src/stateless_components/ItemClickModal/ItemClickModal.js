import React,{PureComponent} from 'react'
import {Button, Header, Image, Modal} from 'semantic-ui-react'
import {FoodItemContext} from "../../Context/LoggedInContext";

class OpenModal extends PureComponent {

    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        };
    }
    componentDidMount(){
        console.log(["ItemClickModal.js componentDidMount"]);
        console.log(this.props);
    }

    componentDidUpdate(prevProps,prevState,snapShot){
        console.log("[ItemClickModal.js componentDidUpdate]");
        console.log(prevProps);
        console.log(this.props);
        if(prevProps.isModalOpen !== this.props.isModalOpen){
            this.setState({isModalOpen:true})
        }
    }

    closeButtonHandler=()=>{
      this.setState({isModalOpen:false})
    };
    render(){
        //console.log(this.state);
        //console.log(this.props);
        return (
            <FoodItemContext.Consumer>
                {foodItemInfo =>
                    (
                        <>
                            <Modal open={this.state.isModalOpen } onClose={this.closeButtonHandler} closeOnEscape={true}  trigger={this.props.children} centered={false} >
                                <Modal.Actions>
                                    <Button color='grey' onClick={this.closeButtonHandler} >
                                        Close
                                    </Button>
                                </Modal.Actions>
                                <Modal.Header>{foodItemInfo.title}</Modal.Header>
                                <Modal.Content image>
                                    <Image wrapped size='medium' src= {foodItemInfo.images} />
                                    <Modal.Description>
                                        <Header>{foodItemInfo.title}</Header>
                                        <p>Location: {foodItemInfo.location.description}</p>
                                        <p>Description: {foodItemInfo.description}</p>
                                        <p>Price: ${foodItemInfo.price}</p>
                                        <p>Posted on: {foodItemInfo.timestamp}</p>
                                        <p>Seller Info </p>
                                        <p>Contact :{foodItemInfo.contact}</p>
                                        {foodItemInfo.userInfo ?
                                        <>
                                            <p> Post By: {foodItemInfo.userInfo.displayName}</p>
                                            <p>Email:{foodItemInfo.userInfo.email}</p>
                                        </>
                                            : null}

                                    </Modal.Description>
                                </Modal.Content>

                            </Modal>
                        </>
                    )
                }
            </FoodItemContext.Consumer>
        );
    }

}

export default OpenModal;