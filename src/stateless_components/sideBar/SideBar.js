import React from 'react';
import {List,Icon,Label,Button} from 'semantic-ui-react';
import './SideBar.css'
import SellModal from '../sellModal/sellModal';
import {LoggedInContext} from "../../Context/LoggedInContext";
import AutoComplete from '../GoogleAutocomplete/autoComplete';
import CheckBoxFilter from '../CheckBoxFilter/checkBoxFilter';
import {connect} from "react-redux";
import { memeberNewsfeed,memberMarketPlaceSwitch} from "../../Redux/actions/accountLoginAction";
import {guestLoginMarketPlace, guestLoginNewsfeed} from "../../Redux/actions/guestLoginAction";
import {
    marketPlace_RESET,
    change_filters_state,
    set_location,
    set_filters_status
} from "../../Redux/actions/marketPlaceAction";
import {download_My_Post_Data} from "../../firebase/firebase_backend";


const SideBar = (props) =>{
    const style={
        position:'absolute',
        width:'10%',
        left:'8%',
        border:'0px solid white',
        padding:'5px',
        margin:'5px',
    };
    console.log('props');
    console.log(props);


    return (
        <LoggedInContext.Consumer>
            {loggedInMemberInfo => (
                <div style={style} className='media-display'>
                     <List >
                        <List.Item as='a' className='spacingBetweenItems'>
                            <Label onClick={ props.guestLogin.status ? props.guestMarketPlaceClickHandler : props.memberMarketPlaceClickHandler}  horizontal>
                                <Icon link size='huge' name='chess'/>
                                <p style={{fontSize:'20px'}}>Marketplace</p>
                            </Label>
                        </List.Item>

                        <List.Item as='a' className='spacingBetweenItems'>
                            <Label onClick={()=>download_My_Post_Data()} size='huge' horizontal>
                                My Posts
                            </Label>
                        </List.Item>


                        <List.Item  as='a' className='spacingBetweenItems'>
                            <Label onClick={props.guestLogin.status ? props.guestNewsFeedClickHandler : props.memberNewsFeedClickHandler} size='huge' horizontal>
                                News Feed
                            </Label>
                        </List.Item>

                        <List.Item className='spacingBetweenItems'>
                            { loggedInMemberInfo.status ?
                                <SellModal>
                                    <Button
                                        name='sellItem'
                                        color='blue'>
                                        <Icon name='plus'/>
                                        Sell Something
                                    </Button>
                                </SellModal> :
                                <SellModal >
                                    <Button
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
                             <CheckBoxFilter filterState={props.filterState} resetFilters={props.marketPlace.reset}/>
                         </List.Item>

                        <List.Item className='spacingBetweenItems'>
                            <div style={{border:'1px solid lightGrey'}}/>
                            <p style={{fontSize:'20px',margin:'0px'}}>Location</p>

                            {/*<Input size='mini' icon='location arrow' placeholder='Your Location'/>*/}
                            <AutoComplete onPlaceSelected={props.filterByLocation}
                                          inputClassName='locationInput'
                                           reset={props.marketPlace.reset}/>
                        </List.Item>

                     </List>
                </div>
            )}
        </LoggedInContext.Consumer>
            );
};

// take this action on cikcing marketplace icon when user is logged as guest
//take this action on clicking when user is logged in as member

function marketPlaceClickMarketPlace() {
    console.log('clicked');
    return function(dispatch,getState) {
        if(getState().guestLogin.status && getState().guestLogin.newsFeed){
            dispatch(guestLoginMarketPlace());
        }
        else if(getState().accountLogin.status && getState().accountLogin.newsFeed){
            dispatch(memberMarketPlaceSwitch());
        }
        dispatch(marketPlace_RESET());
    };
};

// function newsFeedClicHandler() {
//     console.log('clicked');
//     return function(dispatch,getState) {
//         if(getState().guestLogin.status && getState().guestLogin.newsFeed){
//             dispatch(guestLoginMarketPlace());
//         }
//         else if(getState().accountLogin.status && getState().accountLogin.newsFeed){
//             dispatch(memberMarketPlaceSwitch());
//         }
//         dispatch(marketPlace_RESET());
//     };
// };

const mapStateToProps = (state) => {
    return {
        guestLogin:{
            status : state.guestLogin.status,
            marketPlace:state.guestLogin.marketPlace
        },
        marketPlace:{
            reset:state.marketPlace.reset,
        }

    };
};

const mapDispatchToProps = dispatch => {
    return {
        guestMarketPlaceClickHandler :()=>{dispatch(marketPlaceClickMarketPlace())},
        guestNewsFeedClickHandler:()=>{dispatch(guestLoginNewsfeed())},
        memberMarketPlaceClickHandler:()=>{dispatch(marketPlaceClickMarketPlace())},
        memberNewsFeedClickHandler:()=>{dispatch(memeberNewsfeed())},
        filterState:(filters)=>{dispatch(change_filters_state(filters));},
        filterByLocation:(location)=>{dispatch(set_location(location));},
        set_filters_status:(flag)=>{dispatch(set_filters_status(flag));},
    }
};

export default connect(mapStateToProps,mapDispatchToProps)((SideBar));