import React, { Component } from 'react'
import { Rating,Label,Icon } from 'semantic-ui-react'

export default class RatingExampleOnRate extends Component {
    constructor(props){
        super(props);
        this.state = {
            freshness: 0
        };
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('[freshnessRating.js] shouldComponentUpdate()', this.state.freshness !== nextState.freshness);
        return this.state.freshness !== nextState.freshness ;
    }

    handleRate = (e, { rating }) => {
        this.setState({ freshness : rating },()=>{this.props.freshnessRating(rating)});
    };

    render() {
        return (
            <>
                <Label size='big'>
                    <Icon name='food'/>
                    Freshness of Food : {this.state.freshness}
                </Label>
                <Rating name='freshness' maxRating={5} onRate={this.handleRate} />
            </>
        )
    }
}