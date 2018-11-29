import firebase from "firebase";



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
                var db = firebase.firestore();
                var category= this.state.category;
                db.collection("posts").add({
                    post_id: "",
                    category: this.state.category,
                    location: this.state.location,
                    title: this.state.title,
                    price: this.state.price,
                    description: this.state.description,
                    freshness: this.state.freshness,
                    images: downloadURL,
                }).then((docRef) => {
                    db.collection("posts").doc(docRef.id).update({
                        post_id: docRef.id
                    });

                    var user = firebase.auth().currentUser;
                    if (user) {
                        // User is signed in.
                        var  uid = user.uid;
                        var prevpost=[];
                        var post_id=[];
                        var prevpostcat=[];
                        var prev_post_id=[];
                        //Storing post id in an array against the categories
                        db.collection("category").doc(category).get().then(function(doc) {
                            if (doc.exists) {
                                // console.log("Document data:", doc.data());
                                prevpostcat.push(doc.data());
                                console.log("Previous posts from signed in category: " + prevpostcat);
                                prev_post_id=prevpostcat[0].post_location;
                                console.log("previous post id from this category" + prev_post_id);
                                db.collection("category").doc(category).set({
                                    post_location: prev_post_id.concat([docRef.id])
                                });
                            } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");
                                db.collection('category').doc(category).set({
                                    post_location: []
                                }).then(()=>{
                                    db.collection('category').doc(category).get().then(function(doc) {
                                        if (doc.exists) {
                                            //console.log("Document data:", doc.data());
                                            prevpostcat.push(doc.data());
                                            console.log("Previous posts from signed in category: " + prevpostcat);
                                            prev_post_id=prevpostcat[0].post_location;
                                            console.log("previous post id from this category" + prev_post_id);
                                            db.collection("category").doc(category).set({
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
                        });
//Storing post id in an array against user id
                        db.collection('userData').doc(uid).get()
                            .then(function(doc) {
                                if (doc.exists) {
                                    // console.log("Document data:", doc.data());
                                    prevpost.push(doc.data());
                                    console.log("Previous posts from signed in user: " + prevpost);
                                    post_id=prevpost[0].post_location;
                                    console.log("previous post id from this user" + post_id);
                                    db.collection("userData").doc(uid).set({
                                        post_location: post_id.concat([docRef.id])
                                    });
                                } else {
                                    // doc.data() will be undefined in this case
                                    console.log("No such document!");
                                    db.collection('userData').doc(uid).set({
                                        post_location: []
                                    }).then(()=>{
                                        db.collection('userData').doc(uid).get().then(function(doc) {
                                            if (doc.exists) {
                                                //console.log("Document data:", doc.data());
                                                prevpost.push(doc.data());
                                                console.log(prevpost);
                                                post_id=prevpost[0].post_location;
                                                console.log(post_id);
                                                db.collection("userData").doc(uid).set({
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
                        console.log("uid: "  + uid);
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

    };

    download_My_Post_Data=()=>{
        var db = firebase.firestore();
        var user = firebase.auth().currentUser;
        var all_myposts=[];
        var post_id=[];
        if (user) {
            var  uid = user.uid;
            db.collection("userData").doc(uid).get().then(function(doc) {
                if (doc.exists) {
                    //console.log("Document data:", doc.data());
                    all_myposts.push(doc.data());
                    post_id=all_myposts[0].post_location;
                    // console.log("My posts: " +post_id);
                    var all_my_prev_posts=[];
                    for(var i= 0; i<post_id.length; i++){
                        db.collection("posts").doc(post_id[i]).get().then(function(doc) {
                            if (doc.exists) {
                                //  console.log("posts data:", doc.data());
                                all_my_prev_posts.push(doc.data());
                            } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");
                            }
                        }).catch(function(error) {
                            console.log("Error getting document:", error);
                        });
                    }
                    console.log("here are all posts form me signed in user!! below");
                    console.log(all_my_prev_posts);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        } else {
            // No user is signed in.
            console.log("No user is signed in.");
        }

    };

    download_category=()=>{
        var db = firebase.firestore();
        var all_posts=new Map();
        db.collection("category").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                all_posts.set(doc.id,doc.data().post_location);
            });
            console.log("here are all posts from category collection!! below");
            console.log(all_posts);
        });
    };

    download_all_Post_Data=()=>{
        var abc=[];
        var db = firebase.firestore();
        var postsRef = db.collection('posts');
        postsRef.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    //console.log(doc.id, '=>', doc.data());
                    abc.push(doc.data());
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        console.log("Here are all posts below");
        console.log(abc);
    };
