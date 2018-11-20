import firebase from "firebase";



//     export const postButtonClickHandler=(state)=>{
//         console.log(state);
//         // this.postItem();
//         // send this info to firebase database
//         // this.uploadImage();
//         var storageRef = firebase.storage().ref("/allpics/" + state.images[0].file.name);
//         var uploadTask = storageRef.put(state.images[0].file);
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
//             console.log('unable to upload image');
//             return error;
//         }, () => {
//             // Handle successful uploads on complete
//             // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//             return uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//                 let db = firebase.firestore();
//                 let category= state.category;
//                 db.collection("posts").add({
//                     post_id: "",
//                     category: state.category,
//                     location: state.location,
//                     title: state.title,
//                     price: state.price,
//                     description: state.description,
//                     freshness: state.freshness,
//                     images: downloadURL,
//                 }).then((docRef) => {
//                     db.collection("posts").doc(docRef.id).update({
//                         post_id: docRef.id
//                     }).catch(err=>console.log('unable to update post id in posted item',err));
//
//                     let user = firebase.auth().currentUser;
//                     if (user) {
//                         // User is signed in.
//                         let  uid = user.uid;
//                         let prevpost=[];
//                         let post_id=[];
//                         let prevpostcat=[];
//                         let prev_post_id=[];
//                         //Storing post id in an array against the categories
//                         db.collection("category").doc(category).get().then(function(doc) {
//                             if (doc.exists) {
//                                 // console.log("Document data:", doc.data());
//                                 prevpostcat.push(doc.data());
//                                 console.log("Previous posts from signed in category: " + prevpostcat);
//                                 prev_post_id=prevpostcat[0].post_location;
//                                 console.log("previous post id from this category" + prev_post_id);
//                                 db.collection("category").doc(category).set({
//                                     post_location: prev_post_id.concat([docRef.id])
//                                 });
//                             } else {
//                                 // doc.data() will be undefined in this case
//                                 console.log("No such document!");
//                                 db.collection('category').doc(category).set({
//                                     post_location: []
//                                 }).then(()=>{
//                                     db.collection('category').doc(category).get().then(function(doc) {
//                                         if (doc.exists) {
//                                             //console.log("Document data:", doc.data());
//                                             prevpostcat.push(doc.data());
//                                             console.log("Previous posts from signed in category: " + prevpostcat);
//                                             prev_post_id=prevpostcat[0].post_location;
//                                             console.log("previous post id from this category" + prev_post_id);
//                                             db.collection("category").doc(category).set({
//                                                 post_location: prev_post_id.concat([docRef.id])
//                                             });
//                                         } else {
//                                             // doc.data() will be undefined in this case
//                                             console.log("No such document!");
//                                         }
//                                     }).catch(function(error) {
//                                         console.log("Error getting document:", error);
//                                     });
//                                 });
//
//                             }
//                         }).catch(function(error) {
//                             console.log("Error getting document:", error);
//                         });
// //Storing post id in an array against user id
//                         db.collection('userData').doc(uid).get()
//                             .then(function(doc) {
//                                 if (doc.exists) {
//                                     // console.log("Document data:", doc.data());
//                                     prevpost.push(doc.data());
//                                     console.log("Previous posts from signed in user: " + prevpost);
//                                     post_id=prevpost[0].post_location;
//                                     console.log("previous post id from this user" + post_id);
//                                     db.collection("userData").doc(uid).set({
//                                         post_location: post_id.concat([docRef.id])
//                                     });
//                                 } else {
//                                     // doc.data() will be undefined in this case
//                                     console.log("No such document!");
//                                     db.collection('userData').doc(uid).set({
//                                         post_location: []
//                                     }).then(()=>{
//                                         db.collection('userData').doc(uid).get().then(function(doc) {
//                                             if (doc.exists) {
//                                                 //console.log("Document data:", doc.data());
//                                                 prevpost.push(doc.data());
//                                                 console.log(prevpost);
//                                                 post_id=prevpost[0].post_location;
//                                                 console.log(post_id);
//                                                 db.collection("userData").doc(uid).set({
//                                                     post_location: post_id.concat([docRef.id])
//                                                 });
//                                             } else {
//                                                 // doc.data() will be undefined in this case
//                                                 console.log("No such document!");
//                                             }
//                                         }).catch(function(error) {
//                                             console.log("Error getting document:", error);
//                                         });
//                                     });
//                                 }
//                             }).catch(function(error) {
//                             console.log("Error getting document:", error);
//                         });
//                         console.log("uid: "  + uid);
//                     } else {
//                         // No user is signed in.
//                         console.log("No user is signed in.");
//                     }
//                     // localStorage.setItem('location', location)
//                     // console.log("Document written with ID: ", docRef.id);
//                 })
//                     .catch(function(error) {
//                         console.error("Error adding document: ", error);
//                     });
//                 return true
//             });
//         });
//
//     };

    export const uploadFile=(state)=>{
        let storageRef = firebase.storage().ref("/allpics/" + state.images[0].file.name);
        return storageRef.put(state.images[0].file).then((snapshot)=>{
            return snapshot.ref.getDownloadURL();
        });

    };

    export const postDataToFirebase=(state,downloadURL)=>{
        let db = firebase.firestore();
        return db.collection("posts").add({
            post_id: "",
            category: state.category,
            location: state.location,
            title: state.title,
            price: state.price,
            description: state.description,
            freshness: state.freshness,
            images: downloadURL,
            contact:state.contact,
            amount:state.amount,
            timestamp:Date.now()
        })
};

    export const appendIDToPost=(docRef)=>{
        let db = firebase.firestore();
        return db.collection("posts").doc(docRef.id).update({

            post_id: docRef.id
        }).catch(err => console.log('unable to update post id in posted item', err));
    };

    export const querySaveCategories=(category,docRef)=>{
        let db = firebase.firestore();
        let prevpostcat=[];
        let prev_post_id=[];
        //Storing post id in an array against the categories
        return db.collection("category").doc(category).get().then(function(doc) {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
                prevpostcat.push(doc.data());
                console.log("Previous posts from signed in category: " + prevpostcat);
                prev_post_id=prevpostcat[0].post_location;
                console.log("previous post id from this category" + prev_post_id);
                return db.collection("category").doc(category).set({
                    post_location: prev_post_id.concat([docRef.id])
                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return db.collection('category').doc(category).set({
                    post_location: []
                }).then(()=>{
                    return db.collection('category').doc(category).get().then(function(doc) {
                        if (doc.exists) {
                            //console.log("Document data:", doc.data());
                            prevpostcat.push(doc.data());
                            console.log("Previous posts from signed in category: " + prevpostcat);
                            prev_post_id=prevpostcat[0].post_location;
                            console.log("previous post id from this category" + prev_post_id);
                            return db.collection("category").doc(category).set({
                                post_location: prev_post_id.concat([docRef.id])
                            });
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    }).catch(function(error) {
                        console.log("Error getting document:", error);
                    });
                });

            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        })
    };

    export const savePostInUserData=(docRef)=>{
        //Storing post id in an array against user id
        let user = firebase.auth().currentUser;
        let db = firebase.firestore();
        let prevpost=[];
        let post_id=[];
        if (user) {
            // User is signed in.
            let uid = user.uid;
            return db.collection('userData').doc(uid).get()
                .then(function(doc) {
                    if (doc.exists) {
                        // console.log("Document data:", doc.data());
                        prevpost.push(doc.data());
                        console.log("Previous posts from signed in user: " + prevpost);
                        post_id=prevpost[0].post_location;
                        console.log("previous post id from this user" + post_id);
                        return db.collection("userData").doc(uid).set({
                            post_location: post_id.concat([docRef.id])
                        });
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                        return db.collection('userData').doc(uid).set({
                            post_location: []
                        }).then(()=>{
                            return db.collection('userData').doc(uid).get().then(function(doc) {
                                if (doc.exists) {
                                    //console.log("Document data:", doc.data());
                                    prevpost.push(doc.data());
                                    console.log(prevpost);
                                    post_id=prevpost[0].post_location;
                                    console.log(post_id);
                                    return db.collection("userData").doc(uid).set({
                                        post_location: post_id.concat([docRef.id])
                                    });
                                } else {
                                    // doc.data() will be undefined in this case
                                    console.log("No such document!");
                                }
                            }).catch(function(error) {
                                console.log("Error getting document:", error);
                            });
                        });
                    }
                }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }

    };

    export const download_My_Post_Data=(uid,success_callback,fail_callback)=>{
        let db = firebase.firestore();
        let all_myposts=[];
        let post_id=[];

            db.collection("userData").doc(uid).get().then(function(doc) {
                if (doc.exists) {
                    //console.log("Document data:", doc.data());
                    all_myposts.push(doc.data());
                    post_id=all_myposts[0].post_location;
                    // console.log("My posts: " +post_id);
                    let all_my_prev_posts=[];
                    for(let i= 0; i<post_id.length; i++){
                         db.collection("posts").doc(post_id[i]).get().then(function(doc) {
                            if (doc.exists) {
                                //  console.log("posts data:", doc.data());
                                all_my_prev_posts.push(doc.data());
                                if(i === post_id.length-1){
                                    //only want to setState with updated result when the loop is going to exit..
                                    success_callback(all_my_prev_posts);
                                }
                            } else {
                                // doc.data() will be undefined in this case
                                success_callback(all_my_prev_posts);
                                console.log("No such document!");
                            }

                        }).catch(function(error) {
                            console.log("Error getting document:", error);
                            fail_callback();

                        });
                    }
                    console.log("here are all posts form me signed in user!! below");
                    console.log(all_my_prev_posts);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    return [];
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
                fail_callback();
            });


    };

    export const download_category=()=>{
        let db = firebase.firestore();
        //var all_posts=new Map();
         return db.collection("category").get().then(function(querySnapshot) {
            let res ={};
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                 //console.log(doc.id, " => ", doc.data().post_location);
                //all_posts.set(doc.id,doc.data().post_location);
                res[doc.id]=doc.data().post_location; // returns object
            });
            //console.log("here are all posts from category collection!! below");
            //console.log(all_posts);
            return res;
        }).catch(err=>{
            console.log('error getting download_categories',err);
            return err;
         });
    };

   export const  download_all_Post_Data=()=>{
        let abc=[];
        let db = firebase.firestore();
        let postsRef = db.collection('posts');
        return postsRef.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    //console.log(doc.id, '=>', doc.data());
                    abc.push(doc.data());
                });
                return abc;
            })
            .catch(err => {
                console.log('Error getting posts', err);
                return err;
            });

    };
