import React, { Component } from 'react'
import { Checkbox } from 'semantic-ui-react'

export default class CheckboxExampleRemoteControl extends Component {
    state = {
                Fruits: true,
                Vegetables: true,
                HomeCooked: true,
                GreenWaste: true,
                Other: true,

    };
    toggle = (e) => {
        let key = e.target.innerText;
        this.setState({ [key]: !this.state[key] },()=>this.props.filterState(this.state));
    };

    resetState=()=>{
        this.setState({
            Fruits: true,
            Vegetables: true,
            HomeCooked: true,
            GreenWaste: true,
            Other: true,
        })
    };
    componentDidUpdate(prevProps,prevState,prevSnapshot){
        if(prevProps.resetFilters !== this.props.resetFilters){
            console.log('[checkBoxFilter.js componentDidUpdate]');
            if(this.props.resetFilters){
                this.resetState();
            }
        }
    }

    render() {
        return (
            <>
                <Checkbox name='Fruits' label='Fruits' onChange={this.toggle} checked={this.state.Fruits} toggle />
                <Checkbox name='Vegetables' label='Vegetables' onChange={this.toggle} checked={this.state.Vegetables} toggle />
                <Checkbox name='HomeCooked' label='HomeCooked' onChange={this.toggle} checked={this.state.HomeCooked} toggle />
                <Checkbox name='GreenWaste' label='GreenWaste' onChange={this.toggle} checked={this.state.GreenWaste} toggle />
                <Checkbox name='Other' label='Other' onChange={this.toggle} checked={this.state.Other} toggle />
            </>
        )
    }
}