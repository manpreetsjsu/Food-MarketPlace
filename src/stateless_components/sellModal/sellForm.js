import React,{Component} from 'react'
import { Button, Form,Icon,Image } from 'semantic-ui-react'
import AutoCompleteInput from '../GoogleAutocomplete/autoComplete';
import DropDown from '../DropDown/DropDown';
import update from 'react-addons-update';
import './sellForm.css';
import PreviewImage from '../PreviewImage/previewImage';
import firebase from "firebase";

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


    postButtonClickHandler=()=>{
        console.log(this.state)
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


    handleUploadChange=(event)=>{
        console.log(this.imageUpload)
        this.imageUpload.click();
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