import React,{Component} from 'react'
import { Segment,Grid, Button,Label } from 'semantic-ui-react'
import  './Grid.css'
import ItemCard from '../feed_post/Card_MaterialUI';
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
        let itemsInRow = this.props.data.slice(0, 4).map((item, index) => {
            return (
                <ItemGridColumn item={item}/>

            );
        });

        if (this.state.seeAllClicked) {
            itemsInRow = [];
            let columnsArray= null;

            let numberofRows = !!(this.props.data.length/4) && !!(this.props.data.length %4) ? Math.floor(this.props.data.length/4)+1 : this.props.data.length / 4;
            let start_index = 0 ;
            let end_index =0 ;
            console.log(numberofRows);

            for(let i=0 ; i<numberofRows ; i++) {
                console.log('loop');
                start_index = end_index ;// old initial end_index becomes new start_index at ith iteration
                console.log('start index' ,start_index);
                end_index+=4;
                console.log('last index' ,end_index);

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
            console.log(itemsInRow);


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
                        See All</Button> : null}
                <Grid columns={4} >
                    {itemsInRow}
                </Grid>
            </div>
        );
    }


}

export default GridComponent