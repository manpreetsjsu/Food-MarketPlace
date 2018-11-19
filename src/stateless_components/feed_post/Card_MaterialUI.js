import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import Modal from '../ItemClickModal/ItemClickModal'
import './Card.css'
import {FoodItemContext} from "../../Context/LoggedInContext";

const FoodItemCard = (props) => {


    return(
    <FoodItemContext.Consumer>
        {foodItemInfo=> (
            <Modal >
                <Card onClick={props.click}>
                    {/*props.click is not working... it is just there when hovering over card , it converts to hover mouse button*/}
                    {/*<Image*/}
                        {/*size='medium'*/}
                        {/*src={require('../../assets/images/food1.jpg')}*/}
                        {/*label={{ color: 'blue', content:'$'+foodItemInfo.price, icon: 'spoon', ribbon: true }}/>*/}
                    <img alt='' src={foodItemInfo.images} height='250px' width='auto' />
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
        )}

    </FoodItemContext.Consumer>
    )
}


export default FoodItemCard;