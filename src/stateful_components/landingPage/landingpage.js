import React , {Component} from 'react';
import LoginModal from '../loginDisplay/loginModal';
import {Button,Message} from 'semantic-ui-react';
import './landingpage.css';
import Item from '../../stateless_components/feed_post/Item'
import Card from '../../stateless_components/feed_post/Card'
import Grid from '../../stateless_components/Grid/Grid'
import AppBar from '../../stateless_components/AppBar/AppBar'
import HeaderBar from "../../stateless_components/HeaderBar/HeaderBar";
import SideBar from "../../stateless_components/sideBar/SideBar";

class landingPage extends Component {
    constructor(props){
        super(props);
        this.state={
            guestLogin: {
                status : false,
            },
            accountLogin: {
                status: false
            }
        }
    }

    guestLogin = () =>{
        this.setState({
            guestLogin:{
                status: true
            }
        })
    };


    render() {
        let output = ''
        if(this.state.guestLogin.status){
            output =(
                <div style={{backgroundColor:'#E8E8E8'}}>
                    <HeaderBar AppBar={<AppBar/>}/>
                    <div style={{position:'absolute',left:'10%',border:'0px solid white', padding:'5px',margin:'5px'}}>
                        <SideBar />
                    </div>
                    <Grid foodCategory='Vegetables' card={<Card img={require('../../assets/images/vegetables.jpg')}/>} />
                    <Grid foodCategory='Home Cooked Food' card={<Card img={require('../../assets/images/cookedFood.jpeg')}/>}/>
                    <Grid foodCategory='Fresh Fruits' card={<Card img={require('../../assets/images/fruits.jpg')}/>}/>

                </div>
            );
        }
        else{
            output= (

                <div id='background' >
                    <video style={{height: 'auto', width:'100%', top: 0, padding: 0}}
                           className="videoTag"
                           muted
                           autoPlay
                           loop>
                        <source src={require('../../assets/video/earth.mp4')} type='video/mp4'/>
                    </video>

                    <LoginModal guestLogin={this.guestLogin}/>
                </div>
            );
        }
        return (
            <div>
                {output}
            </div>
        )

    }
}

export default landingPage;