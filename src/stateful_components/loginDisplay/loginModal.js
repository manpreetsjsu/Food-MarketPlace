import React,{Component} from 'react'
import {Header,Form,Segment,Button,Icon} from 'semantic-ui-react';
import './loginModal.css';


class LoginModal extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
        };
        this.login= this.login.bind(this);
    }

    login(){
        // will connect this to api-backend here
    }


    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value}
            );
    };

    render() {

        return(
                <div id='form'>
                    <Header as='h2' style={{color: "white"}} textAlign='center'>
                        {' '}Log-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment raised>

                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                name='email'
                                placeholder='Enter your email here'
                                onChange={this.onChange}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                name='password'
                                placeholder='Enter your password'
                                type='password'
                                onChange={this.onChange}
                            />
                            <Button
                                name='login'
                                onClick={this.login}
                                color='blue'
                                fluid
                                size='large'>Login</Button>
                            <br/>
                            <Button
                                name='guestLogin'
                                onClick={this.props.guestLogin}
                                color='blue'
                                fluid
                                size='large'>Continue as guest</Button>
                            <br></br>
                            <Button
                                name='signUp'
                                onClick={this.login}
                                color='blue'
                                fluid
                                size='large'>SignUp</Button>
                        </Segment>

                    </Form>
                </div>


        )}
}
export default LoginModal;