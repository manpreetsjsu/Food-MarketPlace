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


    handleChange = (e, { value }) => {
        this.setState({ value },()=> this.props.getCategoryValue(this.state.value))};

    onChangeHandler=(e)=> {
        e.persist();
      console.log(e.target.innerText);
      console.log(e.target.value);
    };

    render(){
        return (
            <Dropdown disabled={this.props.edit} value={this.state.value} placeholder='Category' fluid selection options={options} onChange={this.handleChange} />

        );
    }


};

export default React.memo(DropDownMenu);