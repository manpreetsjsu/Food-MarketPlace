import React from 'react'
import { Grid} from 'semantic-ui-react'

const HeaderBar = (props) => {

    return(
        <Grid columns={5} divided>
            <Grid.Row>
                <div style={{ width:'100%'}}>
                    <Grid.Column>
                        {props.AppBar}
                    </Grid.Column>
                </div>
            </Grid.Row>
        </Grid>
    );

};

export default HeaderBar