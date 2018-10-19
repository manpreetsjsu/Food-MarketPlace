import React from 'react'
import { Segment,Grid, Button,Label } from 'semantic-ui-react'
import  './Grid.css'
import ItemCard from '../feed_post/Card_MaterialUI';

const GridComponent = (props) => {

    const style={
        position:'relative',
        width:'60%',
        left:'20%',
        border:'1px solid lightGrey',
        borderRadius: '5px',
        padding:'0px 5px 20px 35px',
        marginTop:'20px',

    };
    const itemsInRow = props.data.slice(0,5).map((item)=>{
        return  (
            <Grid.Column>
                    <Segment raised>
                        <Label as='a' color='red' ribbon>
                            {item.price}
                        </Label>
                        {<ItemCard click={()=>{}}  info= {item.info} header={item.header} extraInfo={item.extraInfo} timestamp={item.timestamp} img={require('../../assets/images/fruits.jpg')}/>}
                    </Segment>
                </Grid.Column>
        );
    });
    return(
    <div style={style}>
        <p className='foodTextCategory'>{props.category}</p>
        {props.data.length > 5 ?
            <Button
            className='seeAllButtonClass'
            color='black'
            name='seeAll'
            >
            See All</Button> : null}
    <Grid columns={5} >
        <Grid.Row>
            {itemsInRow}
        </Grid.Row>
    </Grid>
    </div>
);

}

export default GridComponent