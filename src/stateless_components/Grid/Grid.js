import React from 'react'
import { Segment,Grid, Button,Label } from 'semantic-ui-react'
import './Grid.css'

const GridComponent = (props) => {

    const style={
        position:'relative',
        width:'60%',
        left:'20%',
        border:'1px solid lightGrey',
        borderRadius: '5px',
        padding:'0px 5px 20px 35px',
        marginTop:'20px',
        overflow:'scroll'
    };
    return(
    <div style={style}>
        <p id='foodTextCategory'>{props.foodCategory}</p>
        <Button
            className='seeAllButtonClass'
            color='black'
            name='seeAll'
            >
            See All
        </Button>
    <Grid columns={4} divided>

        <Grid.Row>
            <Grid.Column>
                <Segment raised>
                    <Label as='a' color='red' ribbon>
                        {props.price}
                    </Label>
                    {props.card}
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment raised>
                    <Label as='a' color='blue' ribbon>
                        {props.price}
                    </Label>
                    {props.card}
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment raised>
                    <Label as='a' color='teal' ribbon>
                        {props.price}
                    </Label>
                    {props.card}
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment raised>
                    <Label as='a' color='green' ribbon>
                        {props.price}
                    </Label>
                    {props.card}
                </Segment>
            </Grid.Column>



        </Grid.Row>


    </Grid>
    </div>
);

}

export default GridComponent