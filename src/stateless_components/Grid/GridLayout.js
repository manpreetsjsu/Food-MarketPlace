import React from 'react'
import RenderGridElements from './RenderGridElements';


const style = {
    position: 'relative',
    width: '60%',
    left: '20%',
    border: '1px solid lightGrey',
    borderRadius: '5px',
    padding: '0px 5px 20px 35px',
    marginTop: '20px',
    // overflowY:'scroll',
    // height:'500px'

};

const GridLayout=(props)=>{

        return(
            <div style={style} >
                <RenderGridElements category={props.category} data={props.data} />
            </div>
        );



};

export default GridLayout;