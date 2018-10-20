import React,{Component} from 'react'
import {Header,Form,Segment,Button} from 'semantic-ui-react';
import fire from './fire';
import './loginModal.css';


class LoginModal extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state={
            email:'',
            password:'',
        };

    }
    componentDidMount(){

    }
    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=> {
                console.log('logedin bruhh');
                this.props.userLogin(this.state.email);
            }
        ).catch((error) => {
            console.log('cant login bruhh');
        });
    }


    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value});
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
                                color='blue'
                                fluid
                                size='large'
                                onClick={this.props.signUp}>SignUp</Button>
                        </Segment>

                    </Form>
                </div>


        )}
}
export default LoginModal;