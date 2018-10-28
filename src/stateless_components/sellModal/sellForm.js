import React,{Component} from 'react'
import { Button, Form,Icon,Image } from 'semantic-ui-react'
import AutoCompleteInput from '../GoogleAutocomplete/autoComplete';
import DropDown from '../DropDown/DropDown';
import update from 'react-addons-update';
import './sellForm.css';
import PreviewImage from '../PreviewImage/previewImage';

function ImageWithCloseIcon(props){
    return(
        <div className='imgPreviewParent'>
        <img className='' src={props.imgUrl} width="150px" height="150px" alt=""/>
        <Icon className='closeIcon' name='close'/>
        </div>
    )
}


class sellForm extends Component{
    constructor(props){
        super(props);
        this.imageUpload = React.createRef();
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
        console.log(this.state)
        // send this info to firebase database
    };

    handleUploadChange=(event)=>{
        console.log(this.imageUpload)
        this.imageUpload.click();
    };

    handleImageChange=(event)=> {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        if (file && file.type.match('image.*')){
            reader.readAsDataURL(file);
        }

        //this method gets triggered when file reader is done reading the file..
        reader.onloadend = () => {
            //update() is immutable way to update the state
            //https://reactjs.org/docs/update.html
            this.setState({
                images: update(this.state.images, {$push: [{file: file, imagePreviewUrl: reader.result, index: this.state.images.length+1}]})
            })
        };
    };

    shouldComponentUpdate(nextProps,nextState){
        console.log('[sellform.js] shouldComponentUpdate')
        return true;
    }

    componentDidMount(){
        console.log('[sellform.js] componentDidMount')
    }

    static getDerivedStateFromProps(props, state){
        //when user uploads or deletes images, then props changes
        //this lifecycle executes when function gets new props before render()
        //only use when component's inner state depends upon props...
        console.log('[sellform.js] getDerivedStateFromProps')
        console.log(props);
        console.log(state);

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

        let previewImages = (<PreviewImage images={this.state.images}/>)

        return(
            <Form>
                {<DropDown getCategoryValue={this.getCategoryValue}/>}
            <br/>
                <AutoCompleteInput onChange={()=>{}} onPlaceSelected={this.getItemLocation} value=''/>

                <Form.Field>
                    <label></label>
                    <input placeholder='What are you selling ?' name="title" onChange={this.saveInfo}/>
                </Form.Field>

                <Form.Field>
                    <label></label>
                    <input placeholder='Price' name="price" onChange={this.saveInfo} />
                </Form.Field>

                <Form.Field>
                    <input  style={{display:'None'}}
                            name="images"
                            placeholder="upload image"
                            type="file"
                            onChange={this.handleImageChange}
                            required multiple
                            ref={node => this.imageUpload= node} />
                    <Button
                        onClick={this.handleUploadChange}
                        icon='upload'
                        content='Upload Images' />

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



export default sellForm