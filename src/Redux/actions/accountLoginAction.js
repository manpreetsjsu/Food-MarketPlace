export function memberLoginMarketPlace(userInfoObject) {
    // set keys-user email, userInfo, status
    return{
        type: "MEMBER_MARKETPLACE",
        payload: userInfoObject
    }
}

export function memberMarketPlaceSwitch(){
    return{
        type:"MEMBER_MARKETPLACE_SWITCH"
    }
}

export function memeberNewsfeed() {
    //sets member newsfeed key to true
    return{
        type:'MEMBER_NEWSFEED'
    }
}

export function showMemberPosts() {
    return{
        type:'SHOW_MEMBER_POSTS'
    }
}

export function memberLogOut(){
    return{
        type:"MEMBER_LOGOUT_HANDLER"
    }

}

export function reload_member_posts(){
    return{
        type:"RELOAD_MEMBER_POSTS"
    }
}