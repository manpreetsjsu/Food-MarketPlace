import React,{Component} from 'react'
import {Header,Form,Segment,Button} from 'semantic-ui-react';
import fire from './fire';
import './loginModal.css';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"


class LoginModal extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state={
            email:'',
            password:'',
        };

    }
    componentDidMount(){

    }

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: function() {
                console.log(this.state.email);
                this.props.userLogin(this.state.email);
            }.bind(this)
        }
    }
//this.props.userLogin(this.state.email);

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value});
    };

    render() {

        return(
                <div id='form'>
                    <Header as='h2' style={{color: "white"}} textAlign='center'>
                        {' '}Sign-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment raised>
                            <StyledFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                            <Button
                                name='guestLogin'
                                onClick={this.props.guestLogin}
                                color='green'

                                size='large'>Continue as guest</Button>
                            <br></br>

                        </Segment>

                    </Form>
                </div>


        )}
}
export default LoginModal;