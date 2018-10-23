import React from 'react';
import {Grid} from 'semantic-ui-react';

const gridRow = (props)=>{

    return(
        <Grid.Row>
            {props.children}
        </Grid.Row>
    )
};

export default gridRow;