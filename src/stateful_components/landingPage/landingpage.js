import React , {Component} from 'react';
import LoginModal from '../loginDisplay/loginModal';
import GridContainer from '../../stateless_components/Grid/GridLayout'
 import HeaderBar from "../../stateless_components/HeaderBar/HeaderBar";
import SideBar from "../../stateless_components/sideBar/SideBar";
import NewsFeed from '../../stateless_components/NewsFeed/NewsFeed'
import Aux from '../../HOC/Auxillary'
import firebase from "firebase"
import {LoggedInContext} from "../../Context/LoggedInContext";

class LandingPage extends Component {
    constructor(props){
        console.log('constructor of landing');
        super(props);
        this.state={

            guestLogin: {
                status : false,
                newsFeed: false,
                marketPlace: false
            },
            accountLogin: {
                status: false,
                userInfo:'',
                email:'',
                newsFeed: false,
                marketPlace: false
            },
            marketPlace:{
                reset:false,
                location:'',
                filters:{
                    Fruits: true,
                    Vegetables: true,
                    HomeCooked: true,
                    GreenWaste: true,
                    Other: true,

                }
            }
        }
    }

    // componentWillMount(){
    //     console.log('[landing page] componentWillMount update]');
    // }
    shouldComponentUpdate(nextProps,nextState){
        console.log('[landing page] shouldComponent update]');
        return nextState.guestLogin.marketPlace !== this.state.guestLogin.marketPlace ||
            nextState.guestLogin.newsFeed !== this.state.guestLogin.newsFeed || nextState.accountLogin.status !== this.state.accountLogin.status
            || nextState.accountLogin.newsFeed !== this.state.accountLogin.newsFeed || nextState.accountLogin.marketPlace !== this.state.accountLogin.marketPlace
            || nextState.marketPlace.location !== this.state.marketPlace.location || nextState.marketPlace.filters !== this.state.marketPlace.filters
            ||  nextState.marketPlace.reset !== this.state.marketPlace.reset   ;
    }
    //
    // componentDidMount(){
    //     console.log('[landing page] componentDidMount update]');
    // }
    //
    // componentWillUpdate(){
    //     console.log('[landing page] willComponent update]');
    // }
    //
    // componentWillUnmount(){
    //     console.log('[landing page] componentWillUnmount update]');
    // }
    //
    // componentDidUpdate(){
    //     console.log('[landing page componentDidUpdate update]');
    // }
    // componentWillReceiveProps(){
    //     console.log('[landing page ComponentWillReceiveProps update]');
    // }

    guestLogin = () => {
        this.setState((prevState, props) => {
            return { ...prevState,
                guestLogin:
                    {
                        status:true,
                        newsFeed:false,
                        marketPlace: true
                    }
            }
        })
    };
    guestNewsFeedClickHandler= ()=>{
        this.setState((prevState, props) => {
            return {...prevState,
                    guestLogin :{
                        status: true,
                        newsFeed: true,
                        marketPlace: false
                    }
            }
        });

    };

    memberNewsFeedClickHandler=()=>{
        this.setState((prevState, props) => {
            return {...prevState,
                accountLogin :{
                    status: prevState.accountLogin.status,
                    userInfo: prevState.accountLogin.userInfo,
                    email:prevState.accountLogin.email,
                    newsFeed: true,
                    marketPlace: false
                }
            }
        });
    };

    guestMarketPlaceClickHandler = () =>{
        this.setState((prevState, props) => {
            return {...prevState,
                guestLogin:{
                    status: true,
                    newsFeed: false,
                    marketPlace: true
                },
                resetFilters: true,
                marketPlace:{
                    reset: true,
                    location:'',
                    filters:{
                        Fruits: true,
                        Vegetables: true,
                        HomeCooked: true,
                        GreenWaste: true,
                        Other: true,

                    }
                }
            }
        });
    };
    memberMarketPlaceClickHandler = () =>{
        this.setState((prevState, props) => {
            return {...prevState,
                accountLogin:{
                    status: prevState.accountLogin.status,
                    userInfo: prevState.accountLogin.userInfo,
                    email: prevState.accountLogin.email,
                    newsFeed: false,
                    marketPlace: true
                },
                resetFilters:true,
                marketPlace:{
                    reset: true,
                    location:'',
                    filters:{
                        Fruits: true,
                        Vegetables: true,
                        HomeCooked: true,
                        GreenWaste: true,
                        Other: true,

                    }
                }
            }
        });
    };

    firebaseLogin = (userObject)=> {
        this.setState((prevState, props) => {
            return { ...prevState,
                accountLogin: {
                    status: true,
                    userInfo: userObject,
                    email: userObject.email,
                    newsFeed:false,
                    marketPlace: true
                }
            }
        });
    };

    getData = ()=> {
        var db = firebase.firestore();
        var docRef = db.collection("data").doc("fv");

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    };

    filterByLocation=(location)=>{
        this.setState((updatedState)=> {
                return {...updatedState,marketPlace: {reset:false,location: location,filters:updatedState.marketPlace.filters}}
            });
        console.log('this is sidebar locatiin' +location);
    };

    filterState=(state)=>{
        this.setState((updatedState)=>{
            return {...updatedState,resetFilters:false,marketPlace:{ reset: false,filters:state,location: updatedState.marketPlace.location}}
        });
    };
    render() {
        console.log('render method of landing page');
        // this will come from backend
        const  data = [
            {
                "title": "Fresh Avacados",
                "description":"These are organic backyard produced vegetables. Fresh, cheap, Hurry UP to buy!",
                "category":"home-cooked",
                "price": "3",
                "amount":"6",
                "freshness": "5",
                "contact": "5103614640",
                "location": "San Jose",
                "timestamp": "2 Hours ago",
                "image": ""
            },
            {
                "title": "Fresh Avacados",
                "description":"These are organic backyard produced vegetables. Fresh, cheap, Hurry UP to buy!",
                "category":"home-cooked",
                "price": "3",
                "amount":"6",
                "freshness": "5",
                "contact": "5103614640",
                "location": "San Jose",
                "timestamp": "2 Hours ago",
                "image": ""
            },
            {
                "title": "Fresh Avacados",
                "description":"These are organic backyard produced vegetables. Fresh, cheap, Hurry UP to buy!",
                "category":"home-cooked",
                "price": "3",
                "amount":"6",
                "freshness": "5",
                "contact": "5103614640",
                "location": "San Jose",
                "timestamp": "2 Hours ago",
                "image": ""
            },
            {
                "title": "Fresh Avacados",
                "description":"These are organic backyard produced vegetables. Fresh, cheap, Hurry UP to buy!",
                "category":"home-cooked",
                "price": "3",
                "amount":"6",
                "freshness": "5",
                "contact": "5103614640",
                "location": "San Jose",
                "timestamp": "2 Hours ago",
                "image": ""
            },
            {
                "title": "Fresh Avacados",
                "description":"These are organic backyard produced vegetables. Fresh, cheap, Hurry UP to buy!",
                "category":"home-cooked",
                "price": "3",
                "amount":"6",
                "freshness": "5",
                "contact": "5103614640",
                "location": "San Jose",
                "timestamp": "2 Hours ago",
                "image": ""
            },
            {
                "title": "Fresh Avacados",
                "description":"These are organic backyard produced vegetables. Fresh, cheap, Hurry UP to buy!",
                "category":"home-cooked",
                "price": "3",
                "amount":"6",
                "freshness": "5",
                "contact": "5103614640",
                "location": "San Jose",
                "timestamp": "2 Hours ago",
                "image": ""
            },
            {
                "title": "Fresh Avacados",
                "description":"These are organic backyard produced vegetables. Fresh, cheap, Hurry UP to buy!",
                "category":"home-cooked",
                "price": "3",
                "amount":"6",
                "freshness": "5",
                "contact": "5103614640",
                "location": "San Jose",
                "timestamp": "2 Hours ago",
                "image": ""
            },
            {
                "title": "Fresh Avacados",
                "description":"These are organic backyard produced vegetables. Fresh, cheap, Hurry UP to buy!",
                "category":"home-cooked",
                "price": "3",
                "amount":"6",
                "freshness": "5",
                "contact": "5103614640",
                "location": "San Jose",
                "timestamp": "2 Hours ago",
                "image": ""
            }
        ];

        let landingPageOutput = null;
        let newsFeedSection = null;
        let marketPlacePageSection= null ;

        if( this.state.guestLogin.marketPlace ||  this.state.accountLogin.marketPlace ){
            marketPlacePageSection = (

                <>
                <HeaderBar/>
                            <SideBar newsFeedClickHandler={this.state.guestLogin.status ? this.guestNewsFeedClickHandler : this.memberNewsFeedClickHandler}
                                     marketPlaceClickHandler={this.state.guestLogin.status ? this.guestMarketPlaceClickHandler : this.memberMarketPlaceClickHandler}
                                     getItemLocation={this.filterByLocation}
                                     filterState={this.filterState}
                                     resetFilters={this.state.marketPlace.reset}/>
                <GridContainer location={this.state.marketPlace.location}
                               reset={this.state.marketPlace.reset}
                               filterState={this.state.marketPlace.filters}
                               category='Recent'
                               data={data}
                />
                </>
            );
        }
        else if(this.state.guestLogin.newsFeed || this.state.accountLogin.newsFeed ){
            newsFeedSection= (
                <>
                <HeaderBar />
                    <SideBar newsFeedClickHandler={this.state.guestLogin.status ? this.guestNewsFeedClickHandler : this.memberNewsFeedClickHandler}
                             marketPlaceClickHandler={this.state.guestLogin.status ? this.guestMarketPlaceClickHandler : this.memberMarketPlaceClickHandler}/>
                    <NewsFeed/>
                </>
            );
        }
        else if (!this.state.guestLogin.status || !this.state.accountLogin.status){
             landingPageOutput= (

                <>
                    <video style={{height: 'auto', width:'100%', top: 0, padding: 0}}
                           className="videoTag"
                           muted
                           autoPlay
                           loop>
                        <source src={require('../../assets/video/earth.mp4')} type='video/mp4'/>
                    </video>
                    { <LoginModal guestLogin={this.guestLogin} userLogin={this.firebaseLogin}/> }
                </>
            );
        }

        return (
            <Aux>
                <LoggedInContext.Provider value={this.state.accountLogin}>
                {landingPageOutput}
                {marketPlacePageSection}
                {newsFeedSection}
                </LoggedInContext.Provider>
            </Aux>
        );

    }
}

export default LandingPage;