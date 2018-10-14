import React from 'react'
import { Grid, Button } from 'semantic-ui-react'
import './Grid.css'

const GridComponent = (props) => {

    const style={
        position:'relative',
        width:'60%',
        left:'20%',
        border:'1px solid lightGrey',
        borderRadius: '5px',
        padding:'0px 5px 20px 35px',
        marginTop:'3px'
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
                {props.card}
            </Grid.Column>
            <Grid.Column>
                {props.card}
            </Grid.Column>
            <Grid.Column>
                {props.card}
            </Grid.Column>
            <Grid.Column>
                {props.card}
            </Grid.Column>

        </Grid.Row>


    </Grid>
    </div>
);

}

export default GridComponent