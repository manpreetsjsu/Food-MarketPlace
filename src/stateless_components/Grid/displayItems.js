import React from 'react'
import {Grid } from 'semantic-ui-react'
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
        const itemsInRow =[];
        const data = props.data; // we will fetch this data from backend... will not come form props.. temporary
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
                                <FoodItemContext.Provider key={item._id} value={item}>
                                    <ItemGridColumn
                                        key={item._id}
                                        item={item}/>
                                </FoodItemContext.Provider>
                            )
                        })
                    }
                </ItemGridRow>
            );

        }
       return itemsInRow
    };
    let gridData = updateDisplayItems();

    return(
        <Grid container>
            { gridData }
        </Grid>
    )
};

export default React.memo(DisplayItems);