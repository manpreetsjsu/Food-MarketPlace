import React,{Component} from 'react'
import { Card, Label,Icon } from 'semantic-ui-react'
import Modal from '../ItemClickModal/ItemClickModal'
import './Card.css'
import {FoodItemContext} from "../../Context/LoggedInContext";
import SellModal from '../sellModal/sellModal';
class FoodItemCard extends Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        };
    }

    closeItemInfoModal=()=>{
        console.log("closeItemInfoModal");
        this.setState((currentState)=>{
            return ({isModalOpen:!currentState.isModalOpen})
        })
    };
    onClickingCardHandler=()=>{
       // console.log("onclickCardHandler");
        this.setState((currentState)=>{
            return ({isModalOpen:!currentState.isModalOpen})
        })
    };

    render(){
        return(
            <FoodItemContext.Consumer>
                {foodItemInfo=> (
                    <Modal isModalOpen={this.state.isModalOpen}>
                        <Card onClick={this.onClickingCardHandler}>
                            <img alt='' src={foodItemInfo.images} height='250px' width='auto' />
                            <Card.Content>
                                <Card.Header>{foodItemInfo.title}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>{foodItemInfo.category}</span>
                                    {this.props.showEditDeleteButton ?
                                        <>
                                            <SellModal>
                                                <Label as='a' size="medium" className="positionEdit" onClick={this.closeItemInfoModal}>
                                                    <Icon name='edit' color="blue" />
                                                </Label>
                                            </SellModal>
                                            <SellModal>
                                            <Label as='a' size="medium" className="positionDelete" onClick={this.closeItemInfoModal}>
                                                <Icon name='delete' color="red" corner/>
                                            </Label>
                                            </SellModal>
                                        </>
                                        : null}
                                </Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                                <p>{foodItemInfo.location.description}</p>
                            </Card.Content>
                        </Card>
                    </Modal>
                )}

            </FoodItemContext.Consumer>
        )
    }


}


export default FoodItemCard;