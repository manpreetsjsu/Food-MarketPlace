import React,{Component} from 'react'
import {Grid, Button,Loader } from 'semantic-ui-react'
import  './Grid.css'
import ItemGridRow from './itemGridRow';
import ItemGridColumn from './itemGridColumn';



class RenderGridElements extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seeAllClicked: false,
            error: false,
            hasMore: true,
            isLoading: true,
            data:[]
        }
    }

    seeAllClickHandler = () => {
        this.setState((prevState, props) => {
            return {...prevState,seeAllClicked: !prevState.seeAllClicked, data:[]}
        });
    };

    componentWillMount(){
        console.log('[gridLayout.js ComponentWillMount]');
    }

    componentDidMount(){
        // fetching remote posts from backend
        this.updateDisplayItems();
        console.log('[gridLayout.js ComponentDidMount]');
    }

    componentDidUpdate(prevProps, prevState, snapsShot){
        console.log('[gridLayout.js ComponentDidUpdate]');
        console.log(this.state);
        if(prevState.seeAllClicked !== this.state.seeAllClicked){
            this.updateDisplayItems()
        }
    }

    shouldComponentUpdate(){
        console.log('[gridLayout.js shouldComponentUpdate]');
        //this component should update only if it data in props get changed...or if user clicks seeAll button
        return true;
    }

    computeRowsNeeded=(data)=>{
        //computes no of rows needed based on the length of array of posts..
        return !!(data.length/4) && !!(data.length %4) ? Math.floor(data.length/4)+1 : data.length / 4;
    };


    updateDisplayItems=()=>{
        const itemsInRow =[];
        const data = this.props.data; // we will fetch this data from backend... will not come form props.. temporary
        const numberofRows = this.state.seeAllClicked ?  this.computeRowsNeeded(data) : 1 ;
        let start_index = 0 ;
        let end_index =0 ;
        for(let i=0 ; i<numberofRows ; i++) {
            start_index = end_index ;// old initial end_index becomes new start_index at ith iteration
            end_index+=4;

            itemsInRow.push(
                <ItemGridRow key={i} >
                    {
                        data.slice(start_index,end_index).map((item, index) => {
                            return (
                                <ItemGridColumn
                                    key={index}
                                    item={item}/>
                            )
                        })
                    }
                </ItemGridRow>
            );
            this.setState((updatedState)=> {

                return {
                    isLoading:false,
                    data: [...itemsInRow]
                }
            });
        }
    };

    render() {
        console.log('render of Grid layout');

        return(
            <>
                { <p  className='foodTextCategory'>{this.props.category}</p>}
                {this.state.data.length > 0  ?
                    <Button
                        className='seeAllButtonClass'
                        color='black'
                        name='seeAll'
                        onClick={this.seeAllClickHandler}
                    >
                        { this.state.seeAllClicked ? 'See Less' : 'See All' }
                    </Button> :
                    null
                }

                <Grid container>
                    {this.state.data}
                    {this.state.isLoading &&  <Loader active inline='centered' />}
                </Grid>
            </>
        );
    }


}

export default RenderGridElements;