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

    //
    componentDidMount(){
        console.log('[landing page] componentDidMount update]');
    }
    //
    componentWillUpdate(){
        console.log('[landing page] willComponent update]');
    }
    //
    // componentWillUnmount(){
    //     console.log('[landing page] componentWillUnmount update]');
    // }
    //
    componentDidUpdate(prevProps){
        console.log('[landing page componentDidUpdate update]');
    }
    // componentWillReceiveProps(){
    //     console.log('[landing page ComponentWillReceiveProps update]');
    // }

   

    render() {
        console.log('render method of landing page');
        console.log(this.props);
        let landingPageOutput = null;
        let newsFeedSection = null;
        let marketPlacePageSection= null ;
        let userPostsSection = null ;


        if( this.props.guestLoginMarketPlace ||  this.props.accountLoginMarketPlace ){
            marketPlacePageSection = (

                <>
                    <HeaderBar/>
                    <SideBar/>
                    <GridContainer >
                        <RenderGridElements />
                    </GridContainer>
                </>
            );
        }
        else if(this.props.guestLoginNewsFeed || this.props.accountLoginNewsFeed ){
            newsFeedSection= (
                <>
                    <HeaderBar memberLogOut={()=>this.props.memberLogOut}
                           guestLogIn={this.props.guestLogIn}/>

                    <SideBar/>
                    <NewsFeed/>
                </>
            );
        }
        else if(this.props.accountLoginStatus && this.props.accountLoginShowMemberPosts){
            userPostsSection = (
                <>
                    <HeaderBar/>
                    <SideBar/>
                    <GridContainer >

                        <UserProfilePosts set_loading_status={this.props.set_loading_status}
                                            reloadMemberPosts={this.props.accountLoginReloadMemberPosts}/>

                    </GridContainer>
                </>
            )
        }

        else if (!this.props.guestLoginStatus || !this.props.accountLoginStatus){
             landingPageOutput= (

                <>
                    <video style={{height: 'auto', width:'100%', top: 0, padding: 0}}
                           className="videoTag"
                           muted
                           autoPlay
                           loop>
                        <source src={require('../../assets/video/earth.mp4')} type='video/mp4'/>
                    </video>
                    { <LoginModal guestLogin={ this.props.guestLoginClickHandler} userLogin={this.props.firebaseLogin}/> }
                </>
            );
        }

        return (
            <Aux>
                <>
                {landingPageOutput}
                {marketPlacePageSection}
                {newsFeedSection}
                {userPostsSection}

                {this.props.marketPlaceIsLoading && <Loader size='large' active/>}
                </>
            </Aux>
        );

    }
}

const mapStateToProps = (state) => {
    return {

            guestLoginStatus : state.guestLogin.status,
            guestLoginNewsFeed: state.guestLogin.newsFeed,
            guestLoginMarketPlace:state.guestLogin.marketPlace,
            accountLoginStatus: state.accountLogin.status,
            accountLoginNewsFeed: state.accountLogin.newsFeed,
            accountLoginMarketPlace: state.accountLogin.marketPlace,
            accountLoginUserInfo: state.accountLogin.userInfo,
            accountLoginShowMemberPosts:state.accountLogin.showMemberPosts,
            accountLoginReloadMemberPosts: state.accountLogin.reloadMemberPosts,
            marketPlaceIsLoading:state.marketPlace.isLoading,



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



