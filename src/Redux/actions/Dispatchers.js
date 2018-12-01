// take this action on cikcing marketplace icon when user is logged as guest
//take this action on clicking when user is logged in as member
import {memeberNewsfeed, memberMarketPlaceSwitch, showMemberPosts} from "../../Redux/actions/accountLoginAction";
import {guestLoginMarketPlace, guestLoginNewsfeed} from "../../Redux/actions/guestLoginAction";
import {
    marketPlace_RESET,
    set_filters_status
} from "../../Redux/actions/marketPlaceAction";


export function marketPlaceCLickHandlerDispatcher() {
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

export function newsFeedClickHandlerDispatcher() {
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

export function myPostsClickHandlerDispatcher(urlHistory=null) {
    console.log('clicked myPosts Dispatcher');
    return function(dispatch,getState) {
        if(getState().accountLogin.status && (getState().accountLogin.newsFeed || getState().accountLogin.marketPlace)){
            dispatch(showMemberPosts());
            if(urlHistory)
                urlHistory.push('/myposts');
        }

        if(!getState().marketPlace.disableFilters && getState().accountLogin.status){
            // @my posts section - filters should be disabled i.disabled=true
            dispatch(set_filters_status(true));
        }

    };
};

export function fetchMemberPostDispatcher() {
    console.log('fetch myPosts Dispatcher');
    return function(dispatch,getState) {
        if(getState().accountLogin.status ){
            dispatch(showMemberPosts());
        }

        if(!getState().marketPlace.disableFilters && getState().accountLogin.status){
            // @my posts section - filters should be disabled i.disabled=true
            dispatch(set_filters_status(true));
        }

    };
};

