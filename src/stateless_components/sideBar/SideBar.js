import React,{Component} from 'react';
import {List,Icon,Label,Button} from 'semantic-ui-react';
import './SideBar.css'
import SellModal from '../sellModal/sellModal';
import AutoComplete from '../GoogleAutocomplete/autoComplete';
import CheckBoxFilter from '../CheckBoxFilter/checkBoxFilter';
import {connect} from "react-redux";
import GuestModal from '../Modals/GuestModal';
import {marketPlaceCLickHandlerDispatcher,myPostsClickHandlerDispatcher,newsFeedClickHandlerDispatcher} from "../../Redux/actions/Dispatchers";
import { withRouter } from 'react-router-dom'



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

    componentDidUpdate = prevProps => {
        const name =
            this.constructor.displayName || this.constructor.name || 'Component';
        console.group(name);
        Object.keys(prevProps).forEach(key => {
            if (prevProps[key] !== this.props[key]) {
                console.log(
                    `property ${key} changed from ${prevProps[key]} to ${
                        this.props[key]
                        }`
                );
            }
        });
        console.groupEnd(name);
    };


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

    handleNewsFeedClick=()=>{
        if(this.props.guestLoginStatus){
            this.props.guestNewsFeedClickHandler();
        }
        else{
            this.props.memberNewsFeedClickHandler();
        }
        this.props.history.push('/newsfeed');
    };

    handleMarketPlaceClick=()=>{
        if(this.props.guestLoginStatus){
            this.props.guestMarketPlaceClickHandler();
        }
        else{
            this.props.memberMarketPlaceClickHandler();
        }
        this.props.history.push('/marketplace');
    };

    handleMyPostClick=()=>{
        if(this.props.guestLoginStatus){
            this.displayPostClickModal();
        }
        else{
            this.props.myPostsClickHandler();
            this.props.history.push('/myposts');
        }
    };

    render(){
        let marketPlace_highlight=false;
        let myPost_hightlight = false;
        let newsfeed_highlight = false;

        if( this.props.guestLoginMarketPlace || this.props.accountLoginMarketPlace){
            marketPlace_highlight=true;
        }
        else if(this.props.guestLoginNewsFeed || this.props.accountLoginNewsFeed){
            newsfeed_highlight=true;
        }
        else if(this.props.accountLoginShowMemberPosts){
            myPost_hightlight=true;
        }

        return (

            <div style={style} className='media-display'>
                <List >
                    <List.Item as='a' className='spacingBetwems'>

                        <Label onClick={ this.handleMarketPlaceClick}
                               horizontal>
                            <Icon link size='huge' name='chess'/>
                            <p style={{fontSize:"20px"}}
                               className={marketPlace_highlight ? "marketPlaceHighLight": ""}>Marketplace</p>
                        </Label>
                    </List.Item>


                    <List.Item as='a' className='spacingBetweenItems'>
                        <GuestModal history={this.props.history} dispatch={this.props.dispatch} content={modalContent1} isOpen={this.state.myPostOpenModal}>
                            <Label className={ myPost_hightlight ? "labelHighLight": ""}
                                   onClick={this.handleMyPostClick}
                                   size='huge'
                                   horizontal>

                                My Posts
                            </Label>
                        </GuestModal>
                    </List.Item>




                    <List.Item  as='a' className='spacingBetweenItems'>
                        <Label className={newsfeed_highlight ? "labelHighLight" : ""}
                               onClick={this.handleNewsFeedClick }
                               size='huge' horizontal>

                            News Feed
                        </Label>
                    </List.Item>

                    <List.Item className='spacingBetweenItems'>
                        { !this.props.guestLoginStatus ?
                            <SellModal history={this.props.history} ismodalopen={this.state.displaySellForm}>
                                <Button
                                    onClick={this.displaySellForm}
                                    name='sellItem'
                                    color='blue'>
                                    <Icon name='plus'/>
                                    Sell Something
                                </Button>
                            </SellModal> :

                            <GuestModal history={this.props.history} isOpen={this.state.sellItemOpenModal} content={modalContent2} dispatch={this.props.dispatch}>
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
                        <CheckBoxFilter dispatch={this.props.dispatch}
                                        resetFilters={this.props.marketPlaceReset}
                                        filters_status={this.props.marketPlaceDisableFilters}   />

                    </List.Item>

                    <List.Item className='spacingBetweenItems'>
                        <div style={{border:'1px solid lightGrey'}}/>
                        <p style={{fontSize:'20px',margin:'0px'}}>Location</p>

                        {/*<Input size='mini' icon='location arrow' placeholder='Your Location'/>*/}
                        <AutoComplete onPlaceSelected={this.props.dispatch}
                                      inputClassName='locationInput'
                                      reset={this.props.marketPlaceReset}
                                      filters_status={this.props.marketPlaceDisableFilters}/>

                    </List.Item>

                </List>
            </div>
        );
    }

};


const mapStateToProps = (state) => {
    return {
        guestLoginStatus : state.guestLogin.status,
        guestLoginMarketPlace:state.guestLogin.marketPlace,
        guestLoginNewsFeed:state.guestLogin.newsFeed,
        accountLoginShowMemberPosts:state.accountLogin.showMemberPosts,
        accountLoginNewsFeed: state.accountLogin.newsFeed,
        accountLoginMarketPlace:state.accountLogin.marketPlace,
        marketPlaceReset:state.marketPlace.reset,
        marketPlaceDisableFilters:state.marketPlace.disableFilters,
        marketPlaceFilters:state.marketPlace.filters,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        guestMarketPlaceClickHandler :()=>{dispatch(marketPlaceCLickHandlerDispatcher())},
        guestNewsFeedClickHandler:()=>{dispatch(newsFeedClickHandlerDispatcher())},
        memberMarketPlaceClickHandler:()=>{dispatch(marketPlaceCLickHandlerDispatcher())},
        memberNewsFeedClickHandler:()=>{dispatch(newsFeedClickHandlerDispatcher())},
        myPostsClickHandler:()=>{dispatch(myPostsClickHandlerDispatcher());},
        dispatch:(action)=>{dispatch(action)}
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)((SideBar)));