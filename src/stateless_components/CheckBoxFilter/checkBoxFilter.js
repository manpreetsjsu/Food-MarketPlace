import React, { Component } from 'react'
import { Checkbox } from 'semantic-ui-react'
import {change_filters_state} from "../../Redux/actions/marketPlaceAction";

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
        this.setState({ [key]: !this.state[key] },()=>this.props.dispatch(change_filters_state(this.state)));
    };

    shouldComponentUpdate(nextProps,nextState){
        return this.state !== nextState || this.props.resetFilters !== nextProps.resetFilters ;
    }

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
        console.log('[checkBoxFilter.js componentDidUpdate]');
        if(prevProps.resetFilters !== this.props.resetFilters){
            console.log('[checkBoxFilter.js componentDidUpdate] resetting filters');
                this.resetState();

        }
    }

    render() {
        return (
            <>
                <Checkbox  disabled={this.props.filters_status}  name='Fruits' label='Fruits' onChange={this.toggle} checked={this.state.Fruits} toggle />
                <Checkbox  disabled={this.props.filters_status} name='Vegetables' label='Vegetables' onChange={this.toggle} checked={this.state.Vegetables} toggle />
                <Checkbox disabled={this.props.filters_status}  name='HomeCooked' label='HomeCooked' onChange={this.toggle} checked={this.state.HomeCooked} toggle />
                <Checkbox  disabled={this.props.filters_status} name='GreenWaste' label='GreenWaste' onChange={this.toggle} checked={this.state.GreenWaste} toggle />
                <Checkbox  disabled={this.props.filters_status} name='Other' label='Other' onChange={this.toggle} checked={this.state.Other} toggle />

            </>
        )
    }
}