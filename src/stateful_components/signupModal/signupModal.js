import React,{Component} from 'react'
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import {Header,Form,Segment,Button} from 'semantic-ui-react';
import './signupModal.css';
import fire from '../loginDisplay/fire';


class SignupModal extends Component {
    constructor(props){
        super(props);
        this.signupSubmit = this.signupSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.userinfo = this.userinfo.bind(this);
        this.state={
            first_name:'',
            last_name:"",
            email:'',
            password:'',
            isSignedIn: false,
        }
    }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            console.log("user", user)
        })
    }

    signupSubmit(e){
        e.preventDefault();
        this.userinfo(e);
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=> {
                console.log(this.state.email);
            }
        ).catch((error) => {
            console.log(this.state.emailz);
                console.log(error);
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    userinfo(e){
        let db = firebase.firestore();
        let citiesRef = db.collection('users');
        citiesRef.doc(this.state.last_name).set({
            email: this.state.email,
            first_Name: this.state.first_name, last_Name: this.state.last_name,
             });
    }


    render() {
        return(
            <div id='form'>
                    <Header as='h2' style={{color:'white'}} textAlign='center'>
                    {' '}Sign up
                </Header>
                <Form size='large' style={{fontWeight:'bold'}}>
                    <Segment raised>

                        <Form.Input
                            fluid
                            icon='at'
                            iconPosition='left'
                            placeholder='Enter the your first name address'
                            name='first_name'
                            onChange={this.onChange}
                        />
                        <Form.Input
                            fluid
                            icon='at'
                            iconPosition='left'
                            placeholder='Enter the your last name address'
                            name='last_name'
                            onChange={this.onChange}
                        />
                        <Form.Input
                            fluid
                            icon='at'
                            iconPosition='left'
                            placeholder='Enter the your email address'
                            name='email'
                            onChange={this.onChange}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Enter the Password you desire'
                            name='password'
                            type='password'
                            onChange={this.onChange}
                        />
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                        <br/>
                        <Button
                            onClick={this.signupSubmit}
                            color='teal'
                            fluid
                            size='large'>Signup</Button>
                        <br/>
                    </Segment>
                </Form>


            </div>


        )}
}
export default SignupModal;