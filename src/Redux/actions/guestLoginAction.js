export function guestLoginMarketPlace(){
    //set guest status to true,marketPlace to true
    return{
        type: "GUEST_MARKETPLACE"
    }
}


export function guestLoginNewsfeed() {
    // newsfeed to true
    return{
        type: "GUEST_NEWSFEED"
    }
}

export function guestLogIn() {
    return{
        type:"GUEST_SIGNIN_HANDLER"
    }

}