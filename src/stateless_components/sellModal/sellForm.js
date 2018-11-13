import React,{Component} from 'react'
import { Input,Button, Form,Label} from 'semantic-ui-react'
import AutoCompleteInput from '../GoogleAutocomplete/autoComplete';
import DropDownMenu from '../DropDown/DropDown';
import update from 'react-addons-update';
import './sellForm.css';
import PreviewImages from '../PreviewImage/previewUploadedImages';
import FileInput from '../FileInput/FileInput';
import FreshnessRating from '../FreshnessRating/freshnessRating';
import axios from 'axios';
import firebase from "firebase"

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
            post_location:'',
            timestamp: '',
            images: [],
            photo:[],
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

//     uploadImage=()=>{
//
//         var storageRef = firebase.storage().ref("/allpics/" + this.state.images[0].file.name);
//         var uploadTask = storageRef.put(this.state.images[0].file);
//
// // Register three observers:
// // 1. 'state_changed' observer, called any time the state changes
// // 2. Error observer, called on failure
// // 3. Completion observer, called on successful completion
//         uploadTask.on('state_changed', function(snapshot){
//             // Observe state change events such as progress, pause, and resume
//             // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//             switch (snapshot.state) {
//                 case firebase.storage.TaskState.PAUSED: // or 'paused'
//                     console.log('Upload is paused');
//                     break;
//                 case firebase.storage.TaskState.RUNNING: // or 'running'
//                     console.log('Upload is running');
//                     break;
//             }
//         }, function(error) {
//             // Handle unsuccessful uploads
//         }, () => {
//             // Handle successful uploads on complete
//             // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//             uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//                 // localStorage.clear();
//                 this.setState({photo: downloadURL})
//                 console.log(this.state.photo);
//                 // localStorage.setItem('myData', downloadURL);
//                 // console.log("local: " + localStorage);
//                 //console.log('File available at', downloadURL);
//
//             });
//         });
//
//
//     };



    postItem=()=>{
      axios.post('http://localhost:3001/posts/',{...this.state})
          .then()
          .catch()
    };

    postButtonClickHandler=()=>{
        console.log(this.state);
       // this.postItem();
        // send this info to firebase database
       // this.uploadImage();
        var storageRef = firebase.storage().ref("/allpics/" + this.state.images[0].file.name);
        var uploadTask = storageRef.put(this.state.images[0].file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function(error) {
            // Handle unsuccessful uploads
        }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                // localStorage.clear();
               // this.setState({photo: downloadURL})
               // console.log(this.state.photo);
                // localStorage.setItem('myData', downloadURL);
                // console.log("local: " + localStorage);
                //console.log('File available at', downloadURL);
                var category = this.state.category;
                var db = firebase.firestore();
                db.collection("data").doc(this.state.category).collection("posts").add({
                    category: this.state.category,
                    location: this.state.location,
                    title: this.state.title,
                    price: this.state.price,
                    images: downloadURL,
                }).then((docRef) => {
                    var post_location ="/data" + "/"+ category + "/posts" + "/" + docRef.id;
                   // this.setState({post_location: post_location})
                   // console.log(this.state.post_location);
                    var user = firebase.auth().currentUser;

                    if (user) {
                        // User is signed in.
                        var  uid = user.uid;
                        console.log("uid: "  + uid);
                        db.collection("userData").doc(uid).set({
                            post_location: post_location
                        });
                    } else {
                        // No user is signed in.

                        console.log("No user is signed in.");
                    }
                    // localStorage.setItem('location', location)
                    // console.log("Document written with ID: ", docRef.id);
                })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });

            });
        });

    // var  docData = {
    //         category: this.state.category,
    //         location: this.state.location,
    //         title: this.state.title,
    //         price: this.state.price,
    //         images: [localStorage.getItem('myData')],
    //     };
      //  console.log(this.state.photo);


       this.downloadPostData();
    };


    downloadPostData=()=>{
        var abc=[];
        var db = firebase.firestore();
        var postsRef = db.collection('data').doc('fruits').collection('posts');
        var allPosts = postsRef.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    //console.log(doc.id, '=>', doc.data());
                    abc.push(doc.data());
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        console.log(abc);
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
                    <Input labelPosition='right'
                           type='text'
                           placeholder='Amount'
                           >
                            <input name="price" onChange={this.saveInfo}/>
                        <Label basic>$</Label>
                    </Input>
                </Form.Field>

                <Form.Field>
                    <textarea name='description' onChange={this.saveInfo} placeholder='Brief Description'/>
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

            </Form>
        )
    }
}



export default SellForm