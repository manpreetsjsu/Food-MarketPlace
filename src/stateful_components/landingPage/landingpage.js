import React , {Component} from 'react';
import LoginModal from '../loginDisplay/loginModal';
import './landingpage.css';
import Card from '../../stateless_components/feed_post/Card'
import Grid from '../../stateless_components/Grid/Grid'
import AppBar from '../../stateless_components/AppBar/AppBar'
import HeaderBar from "../../stateless_components/HeaderBar/HeaderBar";
import SideBar from "../../stateless_components/sideBar/SideBar";
import Card_MaterialUI from '../../stateless_components/feed_post/Card_MaterialUI'
import SearchBar from '../../stateless_components/SearchBar/SearchBar'
import NewsFeed from '../../stateless_components/NewsFeed/NewsFeed'

class landingPage extends Component {
    constructor(props){
        super(props);
        this.state={
            guestLogin: {
                status : false,
                newsFeed: false,
                marketPlace: false
            },
            accountLogin: {
                status: false
            }
        }
    }

    guestLogin = () =>{
        this.setState({
            guestLogin:{
                status: true,
                marketPlace: true
            }
        })
    };
    newsFeedClickHandler= ()=>{
        this.setState({
            guestLogin:{
                status: true,
                newsFeed: true,
                marketPlace: false
            }
        })
    };

    marketPlaceClickHandler = () =>{
        this.setState({
            guestLogin:{
                status: true,
                newsFeed: false,
                marketPlace: true
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
                price: '$5'
            },
            item2: {
                info: 'These are organic backyard produced Fruits. We do backyard farming in order to produce fresh homemade fruits. We have plenty in backyard. Hurry up to pick of your choice',
                extraInfo:'strawberries, rasberries, kiwis...',
                timestamp: 'Oct 13, 9AM',
                header: 'Organic Fruits ',
                subHeader: '',
                price:'$3'
            }

        };
        let landingPageOutput = null;
        let newsFeedSection = null;
        let marketPlacePageSection= null ;




        if(this.state.guestLogin.status && this.state.guestLogin.marketPlace ){
            console.log('guest login-true, marketplace -true')
            marketPlacePageSection = (
                <div style={{backgroundColor:''}}>
                    <HeaderBar AppBar={<AppBar/>}/>
                    <div style={{position:'absolute',left:'10%',border:'0px solid white', padding:'5px',margin:'5px'}}>
                        <SideBar newsFeedClickHandler={this.newsFeedClickHandler} marketPlaceClickHandler={this.marketPlaceClickHandler}/>
                    </div>
                            <Grid price = {dummyData.item1.price} foodCategory='Vegetables' card={<Card_MaterialUI click={()=>{}}  info= {dummyData.item1.info} header={dummyData.item1.header} extraInfo={dummyData.item1.extraInfo} timestamp={dummyData.item1.timestamp} img={require('../../assets/images/vegetables.jpg')}/>} />
                            <Grid price = {dummyData.item2.price} foodCategory='Home Cooked Food' card={<Card img={require('../../assets/images/cookedFood.jpeg')}/>}/>
                            <Grid price = {dummyData.item2.price} foodCategory='Fresh Fruits' card={<Card_MaterialUI click={()=>{}} info= {dummyData.item2.info} header={dummyData.item2.header} extraInfo={dummyData.item2.extraInfo} timestamp={dummyData.item2.timestamp} img={require('../../assets/images/fruits.jpg')}/>}/>

                </div>
            );
        }
        else if(this.state.guestLogin &&  this.state.guestLogin.newsFeed){
            console.log('guestlogin-true, newsfeed-true')
            newsFeedSection= (
                <div style={{backgroundColor:''}}>
                    <HeaderBar AppBar={<AppBar/>}/>
                    <div style={{position:'absolute',left:'10%',border:'0px solid white', padding:'5px',margin:'5px'}}>
                        <SideBar newsFeedClickHandler={this.newsFeedClickHandler} marketPlaceClickHandler={this.marketPlaceClickHandler}/>
                    </div>
                    <NewsFeed/>
                </div>
            );
        }
        else if (! this.state.guestLogin.marketPlace && !this.state.guestLogin.newsFeed){
            console.log('marketplace ,newsfeed both false')
             landingPageOutput= (

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
                {landingPageOutput}
                {marketPlacePageSection}
                {newsFeedSection}
            </div>
        );

    }
}

export default landingPage;