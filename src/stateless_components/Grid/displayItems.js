import React from 'react'
import {Grid,Loader } from 'semantic-ui-react'
import  './Grid.css'
import ItemGridRow from './itemGridRow';
import ItemGridColumn from './itemGridColumn';
import {FoodItemContext} from "../../Context/LoggedInContext";


const DisplayItems=(props)=>{

    function computeRowsNeeded(data){
        //computes no of rows needed based on the length of array of posts..
        return !!(data.length/4) && !!(data.length %4) ? Math.floor(data.length/4)+1 : data.length / 4;
    };

    function updateDisplayItems(){
        let itemsInRow =[];
        const data = props.data; // we will fetch this data from backend... will not come form props.. temporary
        if(data.length > 0){
            const numberofRows =  computeRowsNeeded(data)  ;
            let start_index = 0 ;
            let end_index =0 ;
            for(let i=0 ; i<numberofRows ; i++) {
                start_index = end_index;// old initial end_index becomes new start_index at ith iteration
                end_index += 4;

                itemsInRow.push(
                    <ItemGridRow key={i}>
                        {
                            data.slice(start_index, end_index).map((item) => {
                                return (
                                    <FoodItemContext.Provider key={item.post_id} value={item}>
                                        <ItemGridColumn
                                            isLoading={props.isLoading}
                                            key={item.post_id}
                                            item={item}
                                             showEditDeleteButton={props.showEditDeleteButton}/>
                                    </FoodItemContext.Provider>
                                )
                            })
                        }
                    </ItemGridRow>
                );


            }
            return itemsInRow;
        }
        return itemsInRow;
    };
    let gridData =null;
    if(typeof(props.data) === 'string'){
        //this covers the corner case when there are no items posted at a location.. hence render friendly message on screen
        // or when there are no items to be displayed against a search criteria/filters
        gridData = (
            <p style={{fontSize:"30px"}}>{props.data}</p>
        )
    }
    else{
        gridData = updateDisplayItems();
    }

    console.log("displayItems.js");
    console.log(gridData);
    return(
        <Grid container>
            { !props.isLoading && gridData }
            {props.isLoading && <Loader active/>}
        </Grid>
    )
};

export default React.memo(DisplayItems);