import React , {Component} from 'react';
import LoginModal from '../loginDisplay/loginModal';
import GridContainer from '../../stateless_components/Grid/GridLayout'
 import HeaderBar from "../../stateless_components/HeaderBar/HeaderBar";
import SideBar from "../../stateless_components/sideBar/SideBar";
import NewsFeed from '../../stateless_components/NewsFeed/NewsFeed'
import Aux from '../../HOC/Auxillary'
import SignUpModal from '../signupModal/signupModal'
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
                email:'',
                newsFeed: false,
                marketPlace: false
            },
            signUp:{
                status: false
            }
        }
    }

    componentWillMount(){
        console.log('[landing page] componentWillMount update]');
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log('[landing page] shouldComponent update]');
        return nextState.guestLogin.marketPlace !== this.state.guestLogin.marketPlace ||
            nextState.guestLogin.newsFeed !== this.state.guestLogin.newsFeed || nextState.signUp.status !== this.state.signUp.status || nextState.accountLogin.status !== this.state.accountLogin.status
            || nextState.accountLogin.newsFeed !== this.state.accountLogin.newsFeed || nextState.accountLogin.marketPlace !== this.state.accountLogin.marketPlace;
    }

    componentDidMount(){
        console.log('[landing page] componentDidMount update]');
    }

    componentWillUpdate(){
        console.log('[landing page] willComponent update]');
    }

    componentWillUnmount(){
        console.log('[landing page] componentWillUnmount update]');
    }

    componentDidUpdate(){
        console.log('[landing page componentDidUpdate update]');
    }
    componentWillReceiveProps(){
        console.log('[landing page ComponentWillReceiveProps update]');
    }

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
                    email:prevState.accountLogin.email,
                    newsFeed: true,
                    marketPlace: false
                }
            }
        });
    }

    guestMarketPlaceClickHandler = () =>{
        this.setState((prevState, props) => {
            return {...prevState,
                guestLogin:{
                    status: true,
                    newsFeed: false,
                    marketPlace: true
                }
            }
        });
    };
    memberMarketPlaceClickHandler = () =>{
        this.setState((prevState, props) => {
            return {...prevState,
                accountLogin:{
                    status: prevState.accountLogin.status,
                    email: prevState.accountLogin.email,
                    newsFeed: false,
                    marketPlace: true
                }
            }
        });
    };
    signUpClickHandler = ()=> {
        this.setState((prevState, props) => {
            return {...prevState,
                signUp: {
                    status: true
                }
            }
        });
    };
    firebaseLogin = (email)=> {

        console.log(email);

        this.setState((prevState, props) => {
            return { ...prevState,
                accountLogin: {
                    status: true,
                    email: email,
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
    render() {
        console.log('render method of landing page');
        // this will come from backend
        const  data = [

            {
                info: 'These are organic backyard produced vegetables. Fresh, cheap, Hurry UP to buy! ',
                extraInfo:'cucumber, keel',
                timestamp: 'Oct 13, 9AM',
                header: 'BackYard Fresh Vegetables',
                subHeader: '',
                price: '$5',
                foodCategory:'Fruits'
            },
             {
                info: 'These are organic backyard produced Fruits. We do backyard farming in order to produce fresh homemade fruits.',
                extraInfo:'strawberries, rasberries, kiwis...',
                timestamp: 'Oct 13, 9AM',
                header: 'Organic Fruits ',
                subHeader: '',
                price:'$3',
                 foodCategory:'Vegetables'
            },
            {
                info: 'These are organic backyard produced Fruits. We do backyard farming in order to produce fresh homemade fruits. ',
                extraInfo:'strawberries, rasberries, kiwis...',
                timestamp: 'Oct 13, 9AM',
                header: 'Organic Fruits ',
                subHeader: '',
                price:'$3',
                foodCategory:'Vegetables'
            },
            {
                info: 'These are organic backyard produced Fruits. We do backyard farming in order to produce fresh homemade fruits. ',
                extraInfo:'strawberries, rasberries, kiwis...',
                timestamp: 'Oct 13, 9AM',
                header: 'Organic Fruits ',
                subHeader: '',
                price:'$3',
                foodCategory:'Vegetables'
            },
            {
                info: 'These are organic backyard produced Fruits. We do backyard farming in order to produce fresh homemade fruits. ',
                extraInfo:'strawberries, rasberries, kiwis...',
                timestamp: 'Oct 13, 9AM',
                header: 'Organic Fruits ',
                subHeader: '',
                price:'$3',
                foodCategory:'Vegetables'
            },
            {
                info: 'These are organic backyard produced Fruits. We do backyard farming in order to produce fresh homemade fruits. ',
                extraInfo:'strawberries, rasberries, kiwis...',
                timestamp: 'Oct 13, 9AM',
                header: 'Organic Fruits ',
                subHeader: '',
                price:'$3',
                foodCategory:'Vegetables'
            },
            {
                info: 'These are organic backyard produced vegetables. Fresh, cheap, Hurry UP to buy! ',
                extraInfo:'cucumber, keel',
                timestamp: 'Oct 13, 9AM',
                header: 'BackYard Fresh Vegetables',
                subHeader: '',
                price: '$5',
                foodCategory:'Fruits'
            },
            {
                info: 'These are organic backyard produced vegetables. Fresh, cheap, Hurry UP to buy! ',
                extraInfo:'cucumber, keel',
                timestamp: 'Oct 13, 9AM',
                header: 'BackYard Fresh Vegetables',
                subHeader: '',
                price: '$5',
                foodCategory:'Fruits'
            },
            {
                info: 'These are organic backyard produced vegetables. Fresh, cheap, Hurry UP to buy! ',
                extraInfo:'cucumber, keel',
                timestamp: 'Oct 13, 9AM',
                header: 'BackYard Fresh Vegetables',
                subHeader: '',
                price: '$5',
                foodCategory:'Fruits'
            },
            {
                info: 'These are organic backyard produced vegetables. Fresh, cheap, Hurry UP to buy! ',
                extraInfo:'cucumber, keel',
                timestamp: 'Oct 13, 9AM',
                header: 'BackYard Fresh Vegetables',
                subHeader: '',
                price: '$5',
                foodCategory:'Fruits'
            },
        ];

        let landingPageOutput = null;
        let newsFeedSection = null;
        let marketPlacePageSection= null ;

        if( this.state.guestLogin.marketPlace ||  this.state.accountLogin.marketPlace ){
            marketPlacePageSection = (

                <>
                <HeaderBar/>
                            <SideBar newsFeedClickHandler={this.state.guestLogin.status ? this.guestNewsFeedClickHandler : this.memberNewsFeedClickHandler}
                                     marketPlaceClickHandler={this.state.guestLogin.status ? this.guestMarketPlaceClickHandler : this.memberMarketPlaceClickHandler}/>
                <GridContainer category='Fruits' data={data} />
                <GridContainer category='Vegetables' data={data} />
                <GridContainer category='HomeCooked' data={data} />
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
                    {this.state.signUp.status ?  <SignUpModal /> : <LoginModal guestLogin={this.guestLogin} signUp={this.signUpClickHandler} userLogin={this.firebaseLogin}/> }
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