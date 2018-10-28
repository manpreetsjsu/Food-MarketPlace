import React,{Component} from 'react'
import {Grid, Button } from 'semantic-ui-react'
import  './Grid.css'
import ItemGridRow from './itemGridRow';
import ItemGridColumn from './itemGridColumn';

class GridComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seeAllClicked: false
        }
    }

    seeAllClickHandler = () => {
        this.setState((prevState, props) => {
            return {seeAllClicked: !prevState.seeAllClicked}
        });
    }

    render() {

        const style = {
            position: 'relative',
            width: '60%',
            left: '20%',
            border: '1px solid lightGrey',
            borderRadius: '5px',
            padding: '0px 5px 20px 35px',
            marginTop: '20px',

        };


        // let itemsInRow = this.props.data.slice(0, 4).map((item, index) => {
        //     return (
        //         <ItemGridColumn item={item}/>
        //
        //     );
        // });
        let itemsInRow = [];
        if (true) {

            let numberofRows = !!(this.props.data.length/4) && !!(this.props.data.length %4) ? Math.floor(this.props.data.length/4)+1 : this.props.data.length / 4;
            let start_index = 0 ;
            let end_index =0 ;

            for(let i=0 ; i<numberofRows ; i++) {
                start_index = end_index ;// old initial end_index becomes new start_index at ith iteration
                end_index+=4;

                itemsInRow.push
                (
                    <ItemGridRow  >
                        {
                            this.props.data.slice(start_index,end_index).map((item, index) => {
                                return (
                                    <ItemGridColumn
                                        item={item}/>
                                )
                            })
                        }
                    </ItemGridRow>
                )
            }
    }

        return(
            <div style={style}>
                <p className='foodTextCategory'>{this.props.category}</p>
                {this.props.data.length > 5 ?
                    <Button
                        className='seeAllButtonClass'
                        color='black'
                        name='seeAll'
                        onClick={this.seeAllClickHandler}
                    >
                        { this.state.seeAllClicked ? 'See Less' : 'See All' }</Button> : null}
                <Grid container>
                    {this.state.seeAllClicked ? itemsInRow :itemsInRow.slice(0,1)}
                </Grid>
            </div>
        );
    }


}

export default GridComponent