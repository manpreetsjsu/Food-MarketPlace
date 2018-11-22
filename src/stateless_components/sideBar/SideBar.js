import React,{Component} from 'react';
import {List,Icon,Label,Button} from 'semantic-ui-react';
import './SideBar.css'
import SellModal from '../sellModal/sellModal';
import AutoComplete from '../GoogleAutocomplete/autoComplete';
import CheckBoxFilter from '../CheckBoxFilter/checkBoxFilter';
import {connect} from "react-redux";
import {memeberNewsfeed, memberMarketPlaceSwitch, showMemberPosts} from "../../Redux/actions/accountLoginAction";
import {guestLogIn, guestLoginMarketPlace, guestLoginNewsfeed} from "../../Redux/actions/guestLoginAction";
import GuestModal from '../Modals/GuestModal';

import {
    marketPlace_RESET,
    change_filters_state,
    set_location,
    set_filters_status
} from "../../Redux/actions/marketPlaceAction";


const style={
    position:'absolute',
    width:'10%',
    left:'8%',
    border:'0px solid white',
    padding:'5px',
    margin:'5px',
};

const modalContent1 = 'Want to view your posts !';
const modalContent2 = 'Want to sell something ?';

class SideBar extends Component{

    constructor(props){
        super(props);
        this.state={
            myPostOpenModal:false,
            sellItemOpenModal:false,
            displaySellForm:false
        };
    }

    displayPostClickModal=()=>{
      this.setState((currentState)=>{
       return({myPostOpenModal:!currentState.myPostOpenModal})
      })
    };
    displaySellItemClickModal=()=>{
        this.setState((currentState)=>{
            return({sellItemOpenModal:!currentState.sellItemOpenModal})
        })
    };
    displaySellForm=()=>{
        this.setState((currentState)=>{
            return({displaySellForm:!currentState.displaySellForm})
        })
    };

    render(){
        let marketPlace_highlight=false;
        let myPost_hightlight = false;
        let newsfeed_highlight = false;

        if( this.props.guestLogin.marketPlace || this.props.accountLogin.marketPlace){
            marketPlace_highlight=true;
        }
        else if(this.props.guestLogin.newsFeed || this.props.accountLogin.newsFeed){
            newsfeed_highlight=true;
        }
        else if(this.props.accountLogin.showMemberPosts){
            myPost_hightlight=true;
        }

        return (

            <div style={style} className='media-display'>
                <List >
                    <List.Item as='a' className='spacingBetwems'>

                        <Label onClick={ this.props.guestLogin.status ? this.props.guestMarketPlaceClickHandler : this.props.memberMarketPlaceClickHandler}
                               horizontal>
                            <Icon link size='huge' name='chess'/>
                            <p style={{fontSize:"20px"}}
                               className={marketPlace_highlight ? "marketPlaceHighLight": ""}>Marketplace</p>
                        </Label>
                    </List.Item>

                    <GuestModal redirectToSignIn={this.props.signInHandler} content={modalContent1} isOpen={this.state.myPostOpenModal}>
                    <List.Item as='a' className='spacingBetweenItems'>
                        <Label className={ myPost_hightlight ? "labelHighLight": ""}
                               onClick={!this.props.guestLogin.status ? this.props.myPostsClickHandler : this.displayPostClickModal}
                               size='huge'
                               horizontal>

                            My Posts
                        </Label>
                    </List.Item>
                    </GuestModal>



                    <List.Item  as='a' className='spacingBetweenItems'>
                        <Label className={newsfeed_highlight ? "labelHighLight" : ""}
                               onClick={this.props.guestLogin.status ? this.props.guestNewsFeedClickHandler : this.props.memberNewsFeedClickHandler}
                               size='huge' horizontal>

                            News Feed
                        </Label>
                    </List.Item>

                    <List.Item className='spacingBetweenItems'>
                        { !this.props.guestLogin.status ?
                            <SellModal isModalOpen={this.state.displaySellForm}
                                       redirectToMyPosts={this.props.myPostsClickHandler}
                                       accountLoginMarketPlace={this.props.accountLogin.marketPlace}
                                        redirectToMarketPlace={this.props.memberMarketPlaceClickHandler}>
                                <Button
                                    onClick={this.displaySellForm}
                                    name='sellItem'
                                    color='blue'>
                                    <Icon name='plus'/>
                                    Sell Something
                                </Button>
                            </SellModal> :

                            <GuestModal isOpen={this.state.sellItemOpenModal} content={modalContent2} redirectToSignIn={this.props.signInHandler}>
                                <Button
                                    onClick={this.displaySellItemClickModal}
                                    name='sellItem'
                                    color='blue'>
                                    <Icon name='plus'/>
                                    Sell Something
                                </Button>
                            </GuestModal>}
                    </List.Item>

                    <List.Item className='spacingBetweenItems'>
                        <div style={{border:'1px solid lightGrey'}}/>
                        <p style={{fontSize:'20px',margin:'0px'}}>Filter By</p>
                        <CheckBoxFilter filterState={this.props.filterState}
                                        resetFilters={this.props.marketPlace.reset}
                                        filters_status={this.props.marketPlace.disableFilters}   />

                    </List.Item>

                    <List.Item className='spacingBetweenItems'>
                        <div style={{border:'1px solid lightGrey'}}/>
                        <p style={{fontSize:'20px',margin:'0px'}}>Location</p>

                        {/*<Input size='mini' icon='location arrow' placeholder='Your Location'/>*/}
                        <AutoComplete onPlaceSelected={this.props.filterByLocation}
                                      inputClassName='locationInput'
                                      reset={this.props.marketPlace.reset}
                                      filters_status={this.props.marketPlace.disableFilters}/>

                    </List.Item>

                </List>
            </div>
        );
    }

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
        myPostsClickHandler:()=>{dispatch(myPostsClickHandlerDispatcher());},
        signInHandler:()=>{dispatch(guestLogIn())}
    }
};

export default connect(mapStateToProps,mapDispatchToProps)((SideBar));