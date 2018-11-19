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