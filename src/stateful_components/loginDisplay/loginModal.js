import React,{Component,Suspense} from 'react'
import {Header,Form,Segment,Button,Image,Placeholder} from 'semantic-ui-react';
import './loginModal.css';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"


class LoginModal extends Component {

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: function(result) {
                console.log(result);
                this.props.userLogin(result);
            }.bind(this)
        }
    };


    render() {

        return(
                <div id='form'>
                    <Header as='h2' style={{color: "white"}} textAlign='center'>
                        {' '}Sign-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment raised>
                            <Image size='medium' centered src={require('../../assets/images/shield_food_logo.png')}  />

                            <StyledFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()}
                            />

                            <Button
                                name='guestLogin'
                                onClick={this.props.guestLogin}
                                color='blue'
                                fluid
                                size='large'>Continue as guest</Button>
                            <br></br>

                        </Segment>

                    </Form>
                </div>


        )}
}
export default LoginModal;