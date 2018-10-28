import React from 'react';
import {List,Icon,Label,Button,Input} from 'semantic-ui-react';
import './SideBar.css'
import SellModal from '../sellModal/sellModal';
import GuestModal from '../sellModal/guestModal';
import {LoggedInContext} from "../../Context/LoggedInContext";
import AutoComplete from '../GoogleAutocomplete/autoComplete';


const SideBar = (props) =>{
    const style={
        position:'absolute',
        width:'10%',
        left:'8%',
        border:'0px solid white',
        padding:'5px',
        margin:'5px',
    };
    return (
        <LoggedInContext.Consumer>
            {loggedInMemberInfo => (
                <div style={style} className='media-display'>
                    <List >
                        <List.Item as='a' className='spacingBetweenItems'>
                            <Label onClick={props.marketPlaceClickHandler} horizontal>
                                <Icon link size='huge' name='chess'/>
                                <p style={{fontSize:'20px'}}>Marketplace</p>
                            </Label>
                        </List.Item>

                        <List.Item as='a' className='spacingBetweenItems'>
                            <Label size='huge' horizontal>
                                Vegetables
                            </Label>
                        </List.Item>

                        <List.Item as='a' className='spacingBetweenItems'>
                            <Label size='huge' horizontal>
                                Fruits
                            </Label>
                        </List.Item>

                        <List.Item as='a' className='spacingBetweenItems'>
                            <Label size='huge' horizontal>
                                Other Food
                            </Label>
                        </List.Item>

                        <List.Item  as='a' className='spacingBetweenItems'>
                            <Label onClick={props.newsFeedClickHandler} size='huge' horizontal>
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
                                <SellModal>
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
                            <p style={{fontSize:'20px',margin:'0px'}}>Location</p>

                            {/*<Input size='mini' icon='location arrow' placeholder='Your Location'/>*/}
                            <AutoComplete onPlaceSelected={()=>{}}  inputClassName='locationInput'/>
                        </List.Item>

                        <List.Item className='spacingBetweenItems'>
                            <Input size='mini' icon='location arrow' placeholder='Miles Range'/>
                        </List.Item></List>
                </div>
            )}
        </LoggedInContext.Consumer>
            );
}

export default SideBar;