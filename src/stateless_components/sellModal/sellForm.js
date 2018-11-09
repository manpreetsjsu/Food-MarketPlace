import React,{Component} from 'react'
import { Button, Form} from 'semantic-ui-react'
import AutoCompleteInput from '../GoogleAutocomplete/autoComplete';
import DropDownMenu from '../DropDown/DropDown';
import update from 'react-addons-update';
import './sellForm.css';
import PreviewImages from '../PreviewImage/previewUploadedImages';
import FileInput from '../FileInput/FileInput';

class SellForm extends Component{
    constructor(props){
        super(props);
        this.state={
            postID: '',
            title: '',
            description:'',
            category:'',
            price: '',
            amount: '',
            freshness: '',
            contact: '',
            location: '',
            timestamp: '',
            images: []
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
        console.log(this.state);
        // send this info to firebase database
    };

     handleImageUpload= (file)=>{
         console.log('handle image Upload in sell form');
         this.setState({
             images: update(this.state.images, {$push: [file]})
         })

     };

     handleImageDeletion=(indexOfImage)=>{
         console.log('handle image deletion in sell form - index to be deleted is : ' ,indexOfImage);
         this.setState((prevState)=>{
             return{
                 // images: prevState.images.splice(indexOfImage,1)
                 images: update(this.state.images, {$splice: [[indexOfImage,1]]})
             }
         })
     };

    shouldComponentUpdate(nextProps,nextState){
        console.log('[sellform.js] shouldComponentUpdate');
        return true;
    }

    componentDidMount(){
        console.log('[sellform.js] componentDidMount');
    }

    static getDerivedStateFromProps(props, state){
        //this lifecycle executes when function gets new props before render()
        //only use when component's inner state depends upon props...
        console.log('[sellform.js] getDerivedStateFromProps')
        return null;
    }
    componentDidUpdate(prevProps){
        console.log('[sellform.js] componentDidUpdate')
    }

    componentWillUnmount(){
        console.log('[sellform.js] componentWillUmMount')
    }

    render(){
        console.log('render of sellForm');
        console.log(this.state.images);

        let previewImages = (<PreviewImages deleteUploadedImage={this.handleImageDeletion} images={this.state.images}/>)

        return(
            <Form>
                <Form.Field>
                    <DropDownMenu getCategoryValue={this.getCategoryValue}/>
                </Form.Field>

                <Form.Field>
                    {<AutoCompleteInput
                        onChange={()=>{}}
                        onPlaceSelected={this.getItemLocation}/>}
                </Form.Field>

                <Form.Field>
                    <input
                        placeholder='What are you selling ?'
                        name="title"
                        onChange={this.saveInfo}/>
                </Form.Field>

                <Form.Field>
                    <input
                        placeholder='Price'
                        name="price"
                        onChange={this.saveInfo} />
                </Form.Field>

                <Form.Field>
                        <FileInput appendImageToArray={this.handleImageUpload}/>
                </Form.Field>

                <Form.Field>
                    <Button
                        type='submit'
                        onClick={this.postButtonClickHandler}>Post
                    </Button>

                </Form.Field>

                <Form.Field>
                    <div className='previewImageContainer'>
                        {previewImages}
                    </div>
                </Form.Field>

            </Form>
        )
    }
}



export default SellForm