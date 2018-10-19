
import React,{Component} from 'react';

const classfulHoc=(WrapperComponent,classToApply) =>{
    return class extends Component {
        render() {
            return(
                <div className={classToApply}>
                    <WrapperComponent {...this.props}/>
                </div>
            )
        }

    }
};

export default classfulHoc;