
import React,{Component} from 'react';

const withClass=(WrapperComponent,classToApply) =>{
    return(props) => (
        <div className={classToApply}>
            <WrapperComponent {...props}/>
        </div>
    )
};

export default withClass;