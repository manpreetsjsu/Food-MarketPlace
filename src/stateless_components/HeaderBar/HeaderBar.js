import React from 'react';
import { Grid} from 'semantic-ui-react';
import AppBar from './AppBar';
const HeaderBar = (props) => {

    return(
        <Grid columns={5} divided>
            <Grid.Row>
                <div style={{ width:'100%'}}>
                    <Grid.Column>
                        <AppBar {...props}/>
                    </Grid.Column>
                </div>
            </Grid.Row>
        </Grid>
    );

};

export default React.memo(HeaderBar);