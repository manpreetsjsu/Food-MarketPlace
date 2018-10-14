import React from 'react';
import {List,Icon,Label,Button,Input} from 'semantic-ui-react';
import './SideBar.css'

const SideBar = (props) =>{
    return (
        <div id='sideBar'>
            <List >
                <List.Item as='a' className='spacingBetweenItems'>
                    <Label horizontal>
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

                <List.Item className='spacingBetweenItems'>
                    <Button
                    name='sellItem'
                    color='blue'>
                        <Icon name='plus'/>
                        Sell Something
                    </Button>
                </List.Item>

                <List.Item className='spacingBetweenItems'>
                    <div style={{border:'1px solid lightGrey'}}/>
                    <p style={{fontSize:'20px',margin:'0px'}}>Location</p>
                    <Input size='mini' icon='location arrow' placeholder='Your Location'/>
                </List.Item>

                <List.Item className='spacingBetweenItems'>
                    <Input size='mini' icon='location arrow' placeholder='Miles Range'/>
                </List.Item></List>

        </div>
            );
}

export default SideBar;