import React,{PureComponent} from 'react'
import { Card, Label,Icon } from 'semantic-ui-react'
import Modal from '../ItemClickModal/ItemClickModal'
import './Card.css'
import {FoodItemContext} from "../../Context/LoggedInContext";
import SellModal from '../sellModal/sellModal';

class FoodItemCard extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        };
    }
    componentDidUpdate(prevProps,prevState,snapShot){
        console.log("[ItemCard.js componentDidUpdate]");
        // console.log(prevState);
        // console.log(this.state);
    }

    onClickingCardHandler=()=>{
        console.log("onclickCardHandler");
        this.setState((currentState)=>{
            return ({isModalOpen:!currentState.isModalOpen})
        })
    };

    render(){
        return(
            <FoodItemContext.Consumer>
                {foodItemInfo=> (
                    <>
                    <Modal isModalOpen={this.state.isModalOpen}>
                        <Card onClick={this.onClickingCardHandler} fluid>
                            <img alt='' src={foodItemInfo.images} height='220px' width='auto' />
                            <Card.Content>
                                <Card.Header>{foodItemInfo.title}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>{foodItemInfo.category}</span>

                                </Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                                <p>{foodItemInfo.location.description}</p>
                            </Card.Content>
                        </Card>
                    </Modal>
                        {this.props.showEditDeleteButton ?
                            <>
                                <SellModal edit={true} userInfo={foodItemInfo}>
                                    <Label as='a' size="medium" className="positionEdit" >
                                        <Icon name='edit' color="blue" />
                                    </Label>
                                </SellModal>
                            </>
                            : null}
                    </>
                )}

            </FoodItemContext.Consumer>
        )
    }


}


export default FoodItemCard;