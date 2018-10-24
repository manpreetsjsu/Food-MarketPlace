import React from 'react';
import { Grid} from 'semantic-ui-react';
import AppBar from '../AppBar/AppBar';
const HeaderBar = (props) => {

    return(
        <Grid columns={5} divided>
            <Grid.Row>
                <div style={{ width:'100%'}}>
                    <Grid.Column>
                        <AppBar/>
                    </Grid.Column>
                </div>
            </Grid.Row>
        </Grid>
    );

};

export default HeaderBar