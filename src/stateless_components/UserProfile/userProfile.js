import React,{PureComponent,} from 'react';
import DisplayItems from '../Grid/displayItems';
import {download_My_Post_Data} from "../../firebase/firebase_backend";
import firebase from "firebase";
import  './userProfile.css';

class UserProfilePosts extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            error:false,
            reloadPostSection:false
        }
    };
    success_callback=(user_posts)=>{
        console.log('success_callback');
        this.setState({data:user_posts});
        console.log("set loader to false");
        this.props.set_loading_status(false);
    };
    fail_callback=()=>{
        console.log('fail callback');
        this.setState({error:true});
        this.props.set_loading_status(false);
    };

    componentDidMount(){
        console.log('[UserProfile.js ComponentDidMount]');
        console.log("set loader to true");
        this.props.set_loading_status(true);
        let user = firebase.auth().currentUser;
        download_My_Post_Data(user.uid,this.success_callback,this.fail_callback);

    }


    componentDidUpdate(prevProps, prevState, snapsShot){
        console.log('[UserProfile.js ComponentDidUpdate]');

        console.log(prevProps);
        console.log(this.props);
        let user = firebase.auth().currentUser;
        if(prevProps.reloadMemberPosts !== this.props.reloadMemberPosts && user){
            console.log('fetching posts in update');

            this.props.set_loading_status(true);
            download_My_Post_Data(user.uid,this.success_callback,this.fail_callback);
        }


    }

    // shouldComponentUpdate(){
    //     console.log('[UserProfile.js shouldComponentUpdate]');
    //     return true;
    // }
    componentWillUpdate(){
        console.log('[UserProfile.js componentWillUpdate]');
    }

    render() {
        console.log('[UserProfile.js render method]');
        return(
            <>
                { <p  className='userPostText'>Your Posts</p>}
                { <DisplayItems data={this.state.data} showEditDeleteButton={true}/>}
            </>
        );
    }
}

export default UserProfilePosts;