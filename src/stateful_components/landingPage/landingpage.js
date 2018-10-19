import React , {Component} from 'react';
import LoginModal from '../loginDisplay/loginModal';
import Grid from '../../stateless_components/Grid/Grid'
import AppBar from '../../stateless_components/AppBar/AppBar'
import HeaderBar from "../../stateless_components/HeaderBar/HeaderBar";
import SideBar from "../../stateless_components/sideBar/SideBar";
import NewsFeed from '../../stateless_components/NewsFeed/NewsFeed'
import Aux from '../../HOC/Auxillary'
import SignUpModal from '../signupModal/signupModal'

class landingPage extends Component {
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
                status: false
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
        console.log(nextState.guestLogin.marketPlace !== this.state.guestLogin.marketPlace || nextState.guestLogin.newsFeed !== this.state.guestLogin.newsFeed);
        return nextState.guestLogin.marketPlace !== this.state.guestLogin.marketPlace ||
            nextState.guestLogin.newsFeed !== this.state.guestLogin.newsFeed || nextState.signUp.status !== this.state.signUp.status;
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
            return {guestLogin: {status:true,newsFeed:false,marketPlace: true}}
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
    signUpClickHandler = ()=> {
        console.log("sign up clicked")
        this.setState({
            signUp: {
                status: true
            }
        })
    }

    ;

    render() {
        console.log('render method of landing page');
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
                info: 'These are organic backyard produced Fruits. We do backyard farming in order to produce fresh homemade fruits.',
                extraInfo:'strawberries, rasberries, kiwis...',
                timestamp: 'Oct 13, 9AM',
                header: 'Organic Fruits ',
                subHeader: '',
                price:'$3'
            }

        };

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
            }
        ];

        let landingPageOutput = null;
        let newsFeedSection = null;
        let marketPlacePageSection= null ;

        if(this.state.guestLogin.status && this.state.guestLogin.marketPlace ){
            marketPlacePageSection = (
                <Aux>
                    <HeaderBar AppBar={<AppBar/>}/>
                    <SideBar newsFeedClickHandler={this.newsFeedClickHandler} marketPlaceClickHandler={this.marketPlaceClickHandler}/>
                    <Grid category='Fruits' data={data} />
                    <Grid category='Vegetables' data={data} />
                    <Grid category='HomeCooked' data={data} />
                </Aux>
            );
        }
        else if(this.state.guestLogin &&  this.state.guestLogin.newsFeed){
            newsFeedSection= (
                <Aux>
                    <HeaderBar AppBar={<AppBar/>}/>
                    <SideBar newsFeedClickHandler={this.newsFeedClickHandler} marketPlaceClickHandler={this.marketPlaceClickHandler}/>
                    <NewsFeed/>
                </Aux>
            );
        }
        else if (!this.state.guestLogin.status){
             landingPageOutput= (

                <Aux >
                    <video style={{height: 'auto', width:'100%', top: 0, padding: 0}}
                           className="videoTag"
                           muted
                           autoPlay
                           loop>
                        <source src={require('../../assets/video/earth.mp4')} type='video/mp4'/>
                    </video>
                    {this.state.signUp.status ?  <SignUpModal /> : <LoginModal guestLogin={this.guestLogin} signUp={this.signUpClickHandler}/> }
                </Aux>
            );
        }

        return (
            <Aux>
                {landingPageOutput}
                {marketPlacePageSection}
                {newsFeedSection}
            </Aux>
        );

    }
}

export default landingPage;