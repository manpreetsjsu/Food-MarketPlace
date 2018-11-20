import React , {Component} from 'react';
import LoginModal from '../loginDisplay/loginModal';
import GridContainer from '../../stateless_components/Grid/GridLayout'
import HeaderBar from "../../stateless_components/HeaderBar/HeaderBar";
import SideBar from "../../stateless_components/sideBar/SideBar";
import NewsFeed from '../../stateless_components/NewsFeed/NewsFeed'
import Aux from '../../HOC/Auxillary'
import {LoggedInContext} from "../../Context/LoggedInContext";
import {connect} from "react-redux";
import { memberLoginMarketPlace,memberLogOut} from "../../Redux/actions/accountLoginAction";
import {guestLoginMarketPlace,guestLogIn} from "../../Redux/actions/guestLoginAction";

import {Loader} from 'semantic-ui-react';
import {set_loading_status} from "../../Redux/actions/marketPlaceAction";
import RenderGridElements from "../../stateless_components/Grid/RenderGridElements";
import firebase from "firebase";
import UserProfilePosts from '../../stateless_components/UserProfile/userProfile';


class LandingPage extends Component {

    // componentWillMount(){
    //     console.log('[landing page] componentWillMount update]');
    // }
    shouldComponentUpdate(nextProps,nextState){
        console.log('[landing page] shouldComponent update]');
        return true;
        // return nextState.guestLogin.marketPlace !== this.state.guestLogin.marketPlace ||
        //     nextState.guestLogin.newsFeed !== this.state.guestLogin.newsFeed || nextState.accountLogin.status !== this.state.accountLogin.status
        //     || nextState.accountLogin.newsFeed !== this.state.accountLogin.newsFeed || nextState.accountLogin.marketPlace !== this.state.accountLogin.marketPlace
        //     || nextState.marketPlace.location !== this.state.marketPlace.location || nextState.marketPlace.filters !== this.state.marketPlace.filters
        //     ||  nextState.marketPlace.reset !== this.state.marketPlace.reset   ;
    }

    //
    componentDidMount(){
        console.log('[landing page] componentDidMount update]');
    }
    //
    // componentWillUpdate(){
    //     console.log('[landing page] willComponent update]');
    // }
    //
    // componentWillUnmount(){
    //     console.log('[landing page] componentWillUnmount update]');
    // }
    //
    componentDidUpdate(){
        console.log('[landing page componentDidUpdate update]');
    }
    // componentWillReceiveProps(){
    //     console.log('[landing page ComponentWillReceiveProps update]');
    // }
    checkUserAlreadyLoggedIn=()=>{
        let user = firebase.auth().currentUser;
        if(user){
            this.props.firebaseLogin(user);
        }
        else{
            this.props.guestLoginClickHandler();
        }
    };
    render() {
        console.log('render method of landing page');
        console.log(this.props);
        let landingPageOutput = null;
        let newsFeedSection = null;
        let marketPlacePageSection= null ;
        let userPostsSection = null ;


        if( this.props.guestLogin.marketPlace ||  this.props.accountLogin.marketPlace ){
            marketPlacePageSection = (

                <>
                <HeaderBar/>
                    <SideBar/>
                <GridContainer >
                    <RenderGridElements location={this.props.marketPlace.location}
                                        reset={this.props.marketPlace.reset}
                                        filterState={this.props.marketPlace.filters}

                                        set_loading_status={this.props.set_loading_status}/>
                </GridContainer>
                </>
            );
        }
        else if(this.props.guestLogin.newsFeed || this.props.accountLogin.newsFeed ){
            newsFeedSection= (
                <>
                <HeaderBar memberLogOut={()=>this.props.memberLogOut}
                           guestLogIn={this.props.guestLogIn}/>

                    <SideBar/>
                    <NewsFeed/>
                </>
            );
        }
        else if(this.props.accountLogin.status && this.props.accountLogin.showMemberPosts){
            userPostsSection = (
                <>
                    <HeaderBar/>
                    <SideBar/>
                    <GridContainer >
                        <UserProfilePosts set_loading_status={this.props.set_loading_status}/>
                    </GridContainer>
                </>
            )
        }

        else if (!this.props.guestLogin.status || !this.props.accountLogin.status){
             landingPageOutput= (

                <>
                    <video style={{height: 'auto', width:'100%', top: 0, padding: 0}}
                           className="videoTag"
                           muted
                           autoPlay
                           loop>
                        <source src={require('../../assets/video/earth.mp4')} type='video/mp4'/>
                    </video>
                    { <LoginModal guestLogin={this.checkUserAlreadyLoggedIn} userLogin={this.props.firebaseLogin}/> }
                </>
            );
        }

        return (
            <Aux>
                <LoggedInContext.Provider value={this.props.accountLogin}>
                {landingPageOutput}
                {marketPlacePageSection}
                {newsFeedSection}
                {userPostsSection}

                {this.props.marketPlace.isLoading && <Loader size='large' active/>}
                </LoggedInContext.Provider>
            </Aux>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        guestLogin:{
            status : state.guestLogin.status,
            newsFeed: state.guestLogin.newsFeed,
            marketPlace:state.guestLogin.marketPlace
        },
        accountLogin:{
            status: state.accountLogin.status,
            newsFeed: state.accountLogin.newsFeed,
            marketPlace: state.accountLogin.marketPlace,
            userInfo: state.accountLogin.userInfo,
            showMemberPosts:state.accountLogin.showMemberPosts

        },
        marketPlace:{
            isLoading:state.marketPlace.isLoading,
            reset:state.marketPlace.reset,
            location:state.marketPlace.location,
            filters:state.marketPlace.filters
        }

    };
};

const mapDispatchToProps = dispatch => {
    return {
        guestLoginClickHandler: ()=> {dispatch(guestLoginMarketPlace());},
        firebaseLogin:(userInfo)=>{console.log(userInfo);dispatch(memberLoginMarketPlace(userInfo));},
        set_loading_status:(flag)=>{dispatch(set_loading_status(flag))},
        memberLogOut:()=>{dispatch(memberLogOut())},
        guestLogIn:()=>{dispatch(guestLogIn())}

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);



