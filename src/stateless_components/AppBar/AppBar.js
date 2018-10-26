import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {LoggedInContext} from '../../Context/LoggedInContext';
import classNames from 'classnames';
import './AppBar.css';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function ButtonAppBar(props) {
    const { classes } = props;
    return (

        <LoggedInContext.Consumer>
            {accountLogin => (
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton onClick={()=> {}} className={classNames([classes.menuButton])} color="inherit" aria-label="Menu">
                                <MenuIcon classes='custom-display'/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                {accountLogin.status ? accountLogin.email : 'Logged In as Guest'}
                            </Typography>
                            <Button color="inherit">
                                {accountLogin.status ? 'Logout' : 'Login' }
                            </Button>
                        </Toolbar>
                    </AppBar>
                </div>
            )}

        </LoggedInContext.Consumer>
            )

}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
