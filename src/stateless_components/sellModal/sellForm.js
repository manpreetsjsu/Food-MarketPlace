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
            <h2>Your item has been posted successfully on marketplace. Check My Posts or Marketplace Section! </h2>
            </Form.Field>
        </>
    )
};


class SellForm extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state={
            post_id: props.userInfo ? props.userInfo.post_id : '',
            title: props.userInfo ? props.userInfo.title : '',
            description: props.userInfo ? props.userInfo.description : '',
            category: props.userInfo ? props.userInfo.category : '',
            price: props.userInfo ? props.userInfo.price : '',
            freshness: props.userInfo ? props.userInfo.freshness : '',
            contact: props.userInfo ? props.userInfo.contact : '',
            location: props.userInfo ? props.userInfo.location : '',
            timestamp: props.userInfo ? props.userInfo.timestamp : '',
            oldImageUrl:props.userInfo ? props.userInfo.images : '',
            images: [],
            submissionComplete:false,
            clickedPostButton:false,
            errorInSubmission:false,
            redirectToPostSection:false,
            redirectToMarketPlace:false
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
        if(this.state.title.length <= 4){
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
        if(this.props.edit === undefined){
            //user is creating new post - not editing
            if(this.validateForm()){ //validate sell form before posting
                console.log('posting item...');
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
        }
        else if(this.props.edit){ //user is editing the item
            if(this.validateForm()){
                console.log('updating form...')
                // call to firbase goes here - Sarang
            }
        }

    };

    deleteButtonHandler=()=>{
      // delete the item from firebase - sarang
      // then update the myPosts section - reload - Manpreet
        console.log('Deleting item...')
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
                 oldImageUrl:'',images: update(this.state.images, {$splice: [[indexOfImage,1]]})
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
    componentWillMount(){
        if(this.props.userInfo && this.props.edit){
            let arr=[];
            arr.push({file:'',imagePreviewUrl:this.props.userInfo.images});

            this.setState({images:arr})
        }
    }

    componentDidUpdate(prevProps){
        console.log('[sellform.js] componentDidUpdate');
        if(this.state.submissionComplete && !this.state.redirectToPostSection && this.props.accountLoginMarketPlace){
            //if user is currently at marketPlace section
            //redirect user to @ my Posts Section and reload the posts
            this.setState({redirectToPostSection:true},()=>this.props.redirectToMyPosts()); //condition to break infinite loop in DidUpdate
        }
        else if( this.state.submissionComplete && !this.state.redirectToMarketPlace && !this.props.accountLoginMarketPlace ){
            // if user is currently at My posts section or newsfeed section
            //redirect user to marketplace
            this.setState({redirectToMarketPlace:true},()=>this.props.redirectToMarketPlace());
        }

    }

    componentWillUnmount(){
        console.log('[sellform.js] componentWillUmMount')
    }

    render(){
        console.log('render of sellForm');
        console.log(this.state);
        let previewImages = (<PreviewImages deleteUploadedImage={this.handleImageDeletion} images={this.state.images}/>)
        let form = null;
        if(!this.state.clickedPostButton){
            form = (
                <>
                    <Form.Field>
                        <DropDownMenu defaultValue={this.state.category} getCategoryValue={this.getCategoryValue}/>
                    </Form.Field>

                    <Form.Field>
                        {<AutoCompleteInput
                            value={this.state.location.description}
                            onChange={() => {
                            }}
                            onPlaceSelected={this.getItemLocation}/>}
                    </Form.Field>

                    <Form.Field>
                        <input
                            defaultValue={this.state.title}
                            placeholder='What are you selling ?'
                            name="title"
                            onChange={this.saveInfo}/>
                    </Form.Field>

                    <Form.Field>
                        <Input labelPosition='left'
                               type='text'
                               placeholder='Price'
                        >

                            <Label basic>$</Label>
                            <input defaultValue={this.state.price} name="price" onChange={this.saveInfo}/>
                        </Input>
                    </Form.Field>

                    <Form.Field>
                        <input
                            defaultValue={this.state.contact}
                            placeholder='Contact Me Here'
                            name="contact"
                            onChange={this.saveInfo}/>
                    </Form.Field>

                    <Form.Field>
                        <textarea defaultValue={this.state.description} rows="4" cols="50" name='description' onChange={this.saveInfo} placeholder='Brief Description'/>
                    </Form.Field>

                    <Form.Field>
                        <FreshnessRating defaultValue={this.state.freshness} freshnessRating={this.getFreshnessRating}/>
                    </Form.Field>

                    <Form.Field>

                        <FileInput appendImageToArray={this.handleImageUpload}/>
                    </Form.Field>

                    <Form.Field>
                        <Button
                            color="blue"
                            type='submit'
                            onClick={this.postButtonClickHandler}>{this.props.edit ? 'Update' : 'Post'}
                        </Button>
                        {this.props.edit ?
                            <Button onClick={this.deleteButtonHandler} color="red" type='submit'> Delete Item </Button>
                            : null
                        }

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