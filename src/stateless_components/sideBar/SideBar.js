import React,{Component} from 'react';
import {List,Icon,Label,Button} from 'semantic-ui-react';
import './SideBar.css'
import SellModal from '../sellModal/sellModal';
import AutoComplete from '../GoogleAutocomplete/autoComplete';
import CheckBoxFilter from '../CheckBoxFilter/checkBoxFilter';
import {connect} from "react-redux";
import {guestLogIn} from "../../Redux/actions/guestLoginAction";
import GuestModal from '../Modals/GuestModal';
import {
    change_filters_state,
    set_location,
} from "../../Redux/actions/marketPlaceAction";
import {marketPlaceCLickHandlerDispatcher,myPostsClickHandlerDispatcher,newsFeedClickHandlerDispatcher} from "../../Redux/actions/Dispatchers";

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
                            <SellModal isModalOpen={this.state.displaySellForm}>
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
            marketPlace:state.accountLogin.marketPlace,
            userInfo:state.accountLogin.userInfo
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