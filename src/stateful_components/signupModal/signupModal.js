import React,{Component} from 'react'
import {Header,Form,Segment,Button,Icon} from 'semantic-ui-react';
import './signupModal.css';
import fire from '../loginDisplay/fire';

class SignupModal extends Component {
    constructor(props){
        super(props);
        this.signupSubmit = this.signupSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            email:'',
            password:'',
        }
    }

    signupSubmit(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=> {
                console.log(this.state.email);
            }
        ).catch((error) => {
            console.log(this.state.email);
                console.log(error);
            })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return(
            <div id='form'>
                    <Header as='h2' style={{color:'white'}} textAlign='center'>
                    {' '}Sign up
                </Header>
                <Form size='large' style={{fontWeight:'bold'}}>
                    <Segment raised>
                            <Icon
                            name='window close'
                            id='closeIcon'
                            style={{float:"right"}}
                            onClick={this.props.clearState}
                            size='large'/>

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
                        <Button
                            onClick={this.signupSubmit}
                            color='teal'
                            fluid
                            size='large'>Signup</Button>
                        <br/>
                        <Button
                            color='teal'
                            fluid
                            size='large'
                            onClick={this.props.login}>Already Have an Account! Log In Here </Button>
                    </Segment>
                </Form>


            </div>


        )}
}
export default SignupModal;