import React,{Component} from 'react'
import {Button, Header, Icon, Image, Modal} from 'semantic-ui-react'
import {FoodItemContext} from "../../Context/LoggedInContext";

class OpenModal extends Component {

    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        };
    }


    // getDerivedStateFromProps(props,state){
    //     if(props.isModalOpen !== this.state.isModalOpen){
    //         this.setState({isModalOpen:props.isModalOpen})
    //     }
    //}
    componentDidUpdate(prevProps,prevState,snapShot){
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
                            <Modal open={this.state.isModalOpen } onClose={this.closeButtonHandler} trigger={this.props.children} centered={false} closeOnDimmerClick={true}>
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
                                        <p>{foodItemInfo.description}</p>
                                        <p>{foodItemInfo.location.description}</p>
                                        <p>${foodItemInfo.price}</p>
                                        <p>{foodItemInfo.timestamp}</p>
                                        <p>Buy@ {foodItemInfo.contact}</p>
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