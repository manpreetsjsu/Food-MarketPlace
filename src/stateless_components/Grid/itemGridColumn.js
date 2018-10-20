import React from 'react';
import {Grid} from 'semantic-ui-react';
import {Segment,Label} from "semantic-ui-react";
import ItemCard from '../feed_post/Card_MaterialUI';

const gridColumn = (props)=>{

    return(
        <Grid.Column mobile={16} tablet={8} computer={4}>
            <Segment raised>
                <Label as='a' color='red' ribbon>
                    {props.item.price}
                </Label>
                {<ItemCard click={() => {}}
                           info={props.item.info} header={props.item.header} extraInfo={props.item.extraInfo}
                           timestamp={props.item.timestamp}
                           img={require('../../assets/images/fruits.jpg')}/>
                }
            </Segment>
        </Grid.Column>
    )
};

export default gridColumn;