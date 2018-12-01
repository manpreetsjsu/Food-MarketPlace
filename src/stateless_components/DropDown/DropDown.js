import React,{Component} from 'react'
import { Dropdown } from 'semantic-ui-react'


const options = [
    { key: 'Fruits', text: 'Fruits', value: 'Fruits' },
    { key: 'Vegetables', text: 'Vegetables', value: 'Vegetables' },
    { key: 'HomeCooked', text: 'HomeCooked', value: 'HomeCooked' },
    { key: 'GreenWaste', text: 'GreenWaste', value: 'GreenWaste' },
    { key: 'Other', text: 'Other', value: 'Other' },

];

class DropDownMenu extends Component{

    constructor(props){
        super(props);
        this.state={
            value: props.defaultValue || '' ,
        };
    }

    shouldComponentUpdate(nextProps,nextState){
        return this.state.value !== nextState.value ;
    }

    handleChange = (e, { value }) => {
        this.setState({ value },()=> this.props.getCategoryValue(this.state.value))};
    

    render(){
        return (
            <Dropdown value={this.state.value} placeholder='Category' fluid selection options={options} onChange={this.handleChange} />

        );
    }


};

export default React.memo(DropDownMenu);