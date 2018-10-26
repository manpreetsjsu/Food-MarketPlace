import React,{Component} from 'react'
import { Button, Form } from 'semantic-ui-react'
import AutoCompleteInput from '../GoogleAutocomplete/autoComplete';
import DropDown from '../DropDown/DropDown';

class sellForm extends Component{
    constructor(props){
        super(props);
        this.state={
            category:'',
            location:'',
            info:'',
            price:''
        }
    }

    getCategoryValue=(category)=>{
        this.setState({category: category})
    };

    getItemLocation=(locationObject)=>{
        this.setState({location: locationObject})
    };

    saveInfo=(e)=>{
        this.setState({
            [e.target.name]:e.target.value});
    };

    postButtonClickHandler=()=>{
        console.log(this.state)
        // send this info to firebase database
    }


    render(){
        return(
            <Form>
                {<DropDown getCategoryValue={this.getCategoryValue}/>}
            <br/>
                <AutoCompleteInput onChange={()=>{}} onPlaceSelected={this.getItemLocation} value=''/>
                <Form.Field>
                    <label></label>
                    <input placeholder='What are you selling ?' name="info" onChange={this.saveInfo}/>
                </Form.Field>
                <Form.Field>
                    <label></label>
                    <input placeholder='Price' name="price" onChange={this.saveInfo} />
                </Form.Field>

                <Button type='submit' onClick={this.postButtonClickHandler} >Post</Button>
            </Form>
        )
    }
}



export default sellForm