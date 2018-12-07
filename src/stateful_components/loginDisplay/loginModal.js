import React,{Component} from 'react'
import {Header,Form,Segment,Button,Image} from 'semantic-ui-react';
import './loginModal.css';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import {guestLoginMarketPlace} from "../../Redux/actions/guestLoginAction";
import {memberLoginMarketPlace} from "../../Redux/actions/accountLoginAction";
import connect from "react-redux/es/connect/connect";
import { withRouter } from 'react-router-dom'


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
                this.props.firebaseLogin(result);
                console.log(this.props);
                this.props.history.push('/marketplace');
            }.bind(this)
        }
    };

    handleClick=()=>{
      this.props.guestLoginClickHandler();
      this.props.history.push('/marketplace');
    };

    render() {
        return(
            <>
            <video style={{height: 'auto', width:'100%', top: 0, padding: 0}}
                   className="videoTag"
                   muted
                   autoPlay
                   loop>
                <source src={require('../../assets/video/earth.mp4')} type='video/mp4'/>
            </video>
                <div id='form'>
                    <Header as='h2' style={{color: "white"}} textAlign='center'>
                        {' '}Sign-in to your account
                    </Header>
                    {/*<Form size='large'>*/}
                        {/*<Segment raised>*/}
                            <Image size='medium' centered src={require('../../assets/images/shield_food_logo.png')}  />


                    <br></br>
                    <br></br>
                    <br></br>
                            <StyledFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()}
                            />

                            <Button
                                name='guestLogin'
                                onClick={this.handleClick}
                                color='blue'
                                fluid
                                size='large'>Continue as guest</Button>
                            <br></br>

                        {/*</Segment>*/}

                    {/*</Form>*/}
                </div>
            </>
        )}
}

const mapStateToProps = (state) => {
    return {
    };
};


const mapDispatchToProps = dispatch => {
    return {
        guestLoginClickHandler: ()=> {dispatch(guestLoginMarketPlace());},
        firebaseLogin:(userInfo)=>{console.log(userInfo);dispatch(memberLoginMarketPlace(userInfo));},

    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginModal));