import React from 'react'
import RenderGridElements from './RenderGridElements';


const style = {
    position: 'relative',
    width: '60%',
    left: '20%',
    border: '1px solid lightGrey',
    borderRadius: '5px',
    padding: '0px 5px 20px 35px',
    marginTop: '20px'

};

const GridLayout=(props)=>{

        return(
            <div style={style} >
                <RenderGridElements {...props} />
            </div>
        );



};

export default GridLayout;