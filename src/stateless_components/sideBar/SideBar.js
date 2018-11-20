import React from 'react';
import {List,Icon,Label,Button} from 'semantic-ui-react';
import './SideBar.css'
import SellModal from '../sellModal/sellModal';
import {LoggedInContext} from "../../Context/LoggedInContext";
import AutoComplete from '../GoogleAutocomplete/autoComplete';
import CheckBoxFilter from '../CheckBoxFilter/checkBoxFilter';
import {connect} from "react-redux";
import {memeberNewsfeed, memberMarketPlaceSwitch, showMemberPosts} from "../../Redux/actions/accountLoginAction";
import {guestLoginMarketPlace, guestLoginNewsfeed} from "../../Redux/actions/guestLoginAction";
import {
    marketPlace_RESET,
    change_filters_state,
    set_location,
    set_filters_status
} from "../../Redux/actions/marketPlaceAction";

const SideBar = (props) =>{
    const style={
        position:'absolute',
        width:'10%',
        left:'8%',
        border:'0px solid white',
        padding:'5px',
        margin:'5px',
    };
    console.log('props in sidebar');
    console.log(props);

    let marketPlace_highlight=false;
    let myPost_hightlight = false;
    let newsfeed_highlight = false;

        if( props.guestLogin.marketPlace || props.accountLogin.marketPlace){
            marketPlace_highlight=true;
        }
        else if(props.guestLogin.newsFeed || props.accountLogin.newsFeed){
            newsfeed_highlight=true;
        }
        else if(props.accountLogin.showMemberPosts){
            myPost_hightlight=true;
        }


    return (
        <LoggedInContext.Consumer>
            {loggedInMemberInfo => (
                <div style={style} className='media-display'>
                     <List >
                        <List.Item as='a' className='spacingBetwems'>
                            <Label onClick={ props.guestLogin.status ? props.guestMarketPlaceClickHandler : props.memberMarketPlaceClickHandler}  horizontal>
                                <Icon link size='huge' name='chess'/>
                                <p style={{fontSize:"20px"}} className={marketPlace_highlight ? "marketPlaceHighLight": ""}>Marketplace</p>
                            </Label>
                        </List.Item>

                        <List.Item as='a' className='spacingBetweenItems'>
                            <Label className={ myPost_hightlight ? "labelHighLight": ""} onClick={props.myPostsClickHandler} size='huge' horizontal>
                                My Posts
                            </Label>
                        </List.Item>


                        <List.Item  as='a' className='spacingBetweenItems'>
                            <Label className={newsfeed_highlight ? "labelHighLight" : ""} onClick={props.guestLogin.status ? props.guestNewsFeedClickHandler : props.memberNewsFeedClickHandler} size='huge' horizontal>
                                News Feed
                            </Label>
                        </List.Item>

                        <List.Item className='spacingBetweenItems'>
                            { !props.guestLogin.status ?
                                <SellModal redirectToMyPosts={props.myPostsClickHandler}>
                                    <Button
                                        name='sellItem'
                                        color='blue'>
                                        <Icon name='plus'/>
                                        Sell Something
                                    </Button>
                                </SellModal> :
                                <SellModal redirectToMyPosts={props.myPostsClickHandler}>
                                    <Button
                                        disabled
                                        name='sellItem'
                                        color='blue'>
                                        <Icon name='plus'/>
                                        Sell Something
                                    </Button>
                                </SellModal>}
                        </List.Item>

                         <List.Item className='spacingBetweenItems'>
                             <div style={{border:'1px solid lightGrey'}}/>
                             <p style={{fontSize:'20px',margin:'0px'}}>Filter By</p>
                             <CheckBoxFilter filterState={props.filterState}
                                             resetFilters={props.marketPlace.reset}
                                             filters_status={props.marketPlace.disableFilters}   />
                         </List.Item>

                        <List.Item className='spacingBetweenItems'>
                            <div style={{border:'1px solid lightGrey'}}/>
                            <p style={{fontSize:'20px',margin:'0px'}}>Location</p>

                            {/*<Input size='mini' icon='location arrow' placeholder='Your Location'/>*/}
                            <AutoComplete onPlaceSelected={props.filterByLocation}
                                          inputClassName='locationInput'
                                           reset={props.marketPlace.reset}
                                          filters_status={props.marketPlace.disableFilters}/>
                        </List.Item>

                     </List>
                </div>
            )}
        </LoggedInContext.Consumer>
            );
};

// take this action on cikcing marketplace icon when user is logged as guest
//take this action on clicking when user is logged in as member

function marketPlaceCLickHandlerDispatcher() {
    console.log('clicked marketPlace Dispatcher');
    return function(dispatch,getState) {
        if(getState().guestLogin.status && getState().guestLogin.newsFeed ){ // this if condition avoid extra re-rendering - optimization
            dispatch(guestLoginMarketPlace());
        }
        else if(getState().accountLogin.status && (getState().accountLogin.newsFeed || getState().accountLogin.showMemberPosts)){ // avoid extra-re-rendering - optimization
            dispatch(memberMarketPlaceSwitch());
        }
        if(getState().marketPlace.disableFilters){ //avoid extra-re-rendering - optimization
            //if marketplace filters were disabled,then enable
            //@marketplace enable filters
            dispatch(set_filters_status(false));
        }
        //always reset the market place for fetching posts and resetting everything back
        dispatch(marketPlace_RESET());


    };
};

function newsFeedClickHandlerDispatcher() {
    console.log('clicked newsFeed Dispatcher');
    return function(dispatch,getState) {
        if(getState().guestLogin.status && getState().guestLogin.marketPlace){
            dispatch(guestLoginNewsfeed());
        }
        else if( getState().accountLogin.marketPlace || getState().accountLogin.showMemberPosts){
            dispatch(memeberNewsfeed())
        }
        if(!getState().marketPlace.disableFilters){
            // @news feed filters should be disabled = true
            dispatch(set_filters_status(true));
        }

    };
};

function myPostsClickHandlerDispatcher() {
    console.log('clicked myPosts Dispatcher');
    return function(dispatch,getState) {
        if(getState().accountLogin.status && (getState().accountLogin.newsFeed || getState().accountLogin.marketPlace)){
            dispatch(showMemberPosts());
        }
        if(!getState().marketPlace.disableFilters && getState().accountLogin.status){
            // @my posts section - filters should be disabled i.disabled=true
            dispatch(set_filters_status(true));
        }

    };
};

const mapStateToProps = (state) => {
    return {
        guestLogin:{
            status : state.guestLogin.status,
            marketPlace:state.guestLogin.marketPlace,
            newsFeed:state.guestLogin.newsFeed
        },
        accountLogin:{
            showMemberPosts:state.accountLogin.showMemberPosts,
            newsFeed: state.accountLogin.newsFeed,
            marketPlace:state.accountLogin.marketPlace
        },
        marketPlace:{
            reset:state.marketPlace.reset,
            disableFilters:state.marketPlace.disableFilters,
            filters:state.marketPlace.filters,

        }

    };
};

const mapDispatchToProps = dispatch => {
    return {
        guestMarketPlaceClickHandler :()=>{dispatch(marketPlaceCLickHandlerDispatcher())},
        guestNewsFeedClickHandler:()=>{dispatch(newsFeedClickHandlerDispatcher())},
        memberMarketPlaceClickHandler:()=>{dispatch(marketPlaceCLickHandlerDispatcher())},
        memberNewsFeedClickHandler:()=>{dispatch(newsFeedClickHandlerDispatcher())},
        filterState:(filters)=>{dispatch(change_filters_state(filters));},
        filterByLocation:(location)=>{dispatch(set_location(location));},
        myPostsClickHandler:()=>{dispatch(myPostsClickHandlerDispatcher());}
    }
};

export default connect(mapStateToProps,mapDispatchToProps)((SideBar));