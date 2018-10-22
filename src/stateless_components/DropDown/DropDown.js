import React,{Component} from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
    { key: 'fruits', text: 'fruits', value: 'Fruits' },
    { key: 'vegetables', text: 'vegetables', value: 'Vegetables' },
    { key: 'home-cooked', text: 'home-cooked', value: 'Home-Cooked' },
    { key: 'green-waste', text: 'green-waste', value: 'Green-Waste' },
    { key: 'other', text: 'other', value: 'other' },

];

class DropdownMenu extends Component {

    constructor(props){
        super(props);
        this.state={
            categorySelected:''
        }
    }

    onChangeHandler = (e)=>{
      this.setState({categorySelected: e.target.value })
      console.log(e.target); //////////////////////////////////////////////////////
    };

    render(){
        return (
            <Dropdown placeholder='Category' fluid selection options={options} onChange={this.onChangeHandler} />
        );
    }
}

export default DropdownMenu
