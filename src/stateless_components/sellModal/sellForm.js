import React,{Component} from 'react'
import { Input,Button, Form,Label} from 'semantic-ui-react'
import AutoCompleteInput from '../GoogleAutocomplete/autoComplete';
import DropDownMenu from '../DropDown/DropDown';
import update from 'react-addons-update';
import './sellForm.css';
import PreviewImages from '../PreviewImage/previewUploadedImages';
import FileInput from '../FileInput/FileInput';
import FreshnessRating from '../FreshnessRating/freshnessRating';

import {
    uploadFile,
    postDataToFirebase,
    appendIDToPost,
    querySaveCategories,
    savePostInUserData,
} from "../../firebase/firebase_backend";

const PostSubmissionForm=(props)=>{
    return(
        <>
            <Form.Field>
            <h2>Your item has been posted successfully on marketplace </h2>
            </Form.Field>
             <Form.Field>
            <Button
                type='submit'>Close
            </Button>
             </Form.Field>
        </>
    )
};



class SellForm extends Component{
    constructor(props){
        super(props);
        this.state={
            title: '',
            description:'',
            category:'',
            price: '',
            amount: '',
            freshness: '',
            contact: '',
            location: '',
            timestamp: '',
            images: [],

            submissionComplete:false,
            clickedPostButton:false,
            errorInSubmission:false

        }
    }

    getCategoryValue=(category)=>{
        this.setState({category: category})
    };

    getItemLocation=(locationObject)=>{
        this.setState({location: locationObject})
    };

    getFreshnessRating=(rating)=>{
        this.setState({freshness:rating});
    };
    saveInfo=(e)=>{
        this.setState({
            [e.target.name]:e.target.value});
    };


    validateForm=()=>{
        if(this.state.images.length === 0 ){
            return false;
        }
        if(this.state.location === ""){
            return false;
        }
        if(this.state.title.length < 7){
            return false;
        }
        if(this.state.category === ""){
            return false;
        }
        if(this.state.price === "" ){
            return false;
        }
        if(this.state.contact === ""){
            return false;
        }
        return true;
    };


    postButtonClickHandler=()=> {
        // this.setState({isPostSubmitted:true},()=>{
        //     postButtonClickHandler(this.state);
        // });

        if(this.validateForm()){
            this.setState({clickedPostButton: true},
                () => {
                    // uploadFile(this.state).then((url) => url)
                    //     .then((url) => postDataToFirebase(this.state, url))
                    //     .then((docRef) => {console.log(docRef);appendIDToPost(docRef);return docRef})
                    //     .then((docRef) => {querySaveCategories(this.state.category, docRef);return docRef})
                    //     .then((docRef) => savePostInUserData(docRef))
                    //     .then(() => {
                    //         this.setState({submissionComplete: true})
                    //     })
                    //     .catch(err =>{
                    //         this.setState({errorInSubmission:true,clickedPostButton:false})
                    //     });

                    uploadFile(this.state).then(url=>url)
                        .then(url=>postDataToFirebase(this.state,url))
                        .then(docRef=>{
                            return Promise.all([
                                appendIDToPost(docRef),
                                querySaveCategories(this.state.category,docRef),
                                savePostInUserData(docRef)
                            ])
                        }).then(()=>this.setState({submissionComplete: true}))
                        .catch(()=>this.setState({errorInSubmission:true,clickedPostButton:false}))
                });
        }



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

       // console.log('[sellform.js] componentDidMount');
    }

    componentDidUpdate(prevProps){
        console.log('[sellform.js] componentDidUpdate');
        if(this.state.submissionComplete){
            //redirect user to @ my Posts Section
            this.props.redirectToMyPosts();
        }
    }

    componentWillUnmount(){
        console.log('[sellform.js] componentWillUmMount')
    }

    render(){
        console.log('render of sellForm');
        let previewImages = (<PreviewImages deleteUploadedImage={this.handleImageDeletion} images={this.state.images}/>)
        let form = null;
        if(!this.state.clickedPostButton){
            form = (
                <>
                    <Form.Field>
                        <DropDownMenu getCategoryValue={this.getCategoryValue}/>
                    </Form.Field>

                    <Form.Field>
                        {<AutoCompleteInput
                            onChange={() => {
                            }}
                            onPlaceSelected={this.getItemLocation}/>}
                    </Form.Field>

                    <Form.Field>
                        <input
                            placeholder='What are you selling ?'
                            name="title"
                            onChange={this.saveInfo}/>
                    </Form.Field>

                    <Form.Field>
                        <Input labelPosition='right'
                               type='text'
                               placeholder='Amount'
                        >
                            <input name="price" onChange={this.saveInfo}/>
                            <Label basic>$</Label>
                        </Input>
                    </Form.Field>

                    <Form.Field>
                        <input
                            placeholder='Contact Me Here'
                            name="contact"
                            onChange={this.saveInfo}/>
                    </Form.Field>

                    <Form.Field>
                        <textarea rows="4" cols="50" name='description' onChange={this.saveInfo} placeholder='Brief Description'/>
                    </Form.Field>

                    <Form.Field>
                        <FreshnessRating freshnessRating={this.getFreshnessRating}/>
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
                </>
            )
        }
        else if(this.state.clickedPostButton && !this.state.submissionComplete){
            form=(
                <>
                    <Form.Field>
                        <h3>Submitting Your Request ! Please Wait ...</h3>
                    </Form.Field>
                </>
            )
        }
        else if(this.state.submissionComplete){
            form= (<PostSubmissionForm/>)
        }

        else if(this.state.errorInSubmission){
            form=(
                <Form.Field>
                    <h3>There was error while submitting your request. Please try again!</h3>
                </Form.Field>
            )
        }

        return(
                <Form>
                    {form}
                </Form>

        )
    }
}



export default SellForm