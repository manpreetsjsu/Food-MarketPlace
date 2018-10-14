import React , {Component} from 'react';
import LoginModal from '../loginDisplay/loginModal';
import './landingpage.css';
import Card from '../../stateless_components/feed_post/Card'
import Grid from '../../stateless_components/Grid/Grid'
import AppBar from '../../stateless_components/AppBar/AppBar'
import HeaderBar from "../../stateless_components/HeaderBar/HeaderBar";
import SideBar from "../../stateless_components/sideBar/SideBar";
import Card_MaterialUI from '../../stateless_components/feed_post/Card_MaterialUI'
import Modal from '../../stateless_components/ItemClickModal/ItemClickModal'

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

        // this will come from backend
        const  dummyData = {
            item1: {
                info: 'These are organic backyard produced vegetables. Fresh, cheap, Hurry UP!',
                extraInfo:'cucumber, keel',
                timestamp: 'Oct 13, 9AM',
                header: 'BackYard Fresh Vegetables',
                subHeader: '',
            },
            item2: {
                info: 'These are organic backyard produced Fruits. We do backyard farming in order to produce fresh homemade fruits. We have plenty in backyard. Hurry up to pick of your choice',
                extraInfo:'strawberries, rasberries, kiwis...',
                timestamp: 'Oct 13, 9AM',
                header: 'Organic Fruits ',
                subHeader: '',
            }

        };

        let output = '';
        if(this.state.guestLogin.status){
            output =(
                <div style={{backgroundColor:'#E8E8E8'}}>
                    <HeaderBar AppBar={<AppBar/>}/>
                    <div style={{position:'absolute',left:'10%',border:'0px solid white', padding:'5px',margin:'5px'}}>
                        <SideBar click={<Modal/>} />
                    </div>
                    <Grid foodCategory='Vegetables' card={<Card_MaterialUI click={()=>{}} info= {dummyData.item1.info} header={dummyData.item1.header} extraInfo={dummyData.item1.extraInfo} timestamp={dummyData.item1.timestamp} img={require('../../assets/images/vegetables.jpg')}/>} />
                    <Grid foodCategory='Home Cooked Food' card={<Card img={require('../../assets/images/cookedFood.jpeg')}/>}/>
                    <Grid foodCategory='Fresh Fruits' card={<Card_MaterialUI click={()=>{}} info= {dummyData.item2.info} header={dummyData.item2.header} extraInfo={dummyData.item2.extraInfo} timestamp={dummyData.item2.timestamp} img={require('../../assets/images/fruits.jpg')}/>}/>

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