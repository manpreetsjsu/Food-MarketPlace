const initialState =  {
    status: false,
    userInfo:'',
    email:'',
    newsFeed: false,
    marketPlace: false,
    showMemberPosts:false,
    reloadMemberPosts:false

};

const accountLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "MEMBER_MARKETPLACE":
            state = {
                ...state,
                status: true,
                marketPlace:true,
                userInfo:action.payload,
                email:action.payload.email
            };
            break;
        case "MEMBER_NEWSFEED":
            state = {
                ...state,
                marketPlace:false,
                newsFeed:true,
                showMemberPosts:false

            };
            break;
        case "MEMBER_MARKETPLACE_SWITCH":
            state={
                ...state,
                marketPlace:true,
                newsFeed:false,
                showMemberPosts:false
            };
            break;
        case "SHOW_MEMBER_POSTS":
            state={
                ...state,
                newsFeed:false,
                marketPlace:false,
                showMemberPosts:true
            };
            break;
        case "MEMBER_LOGOUT_HANDLER":
            state={
                status: false,
                userInfo:'',
                email:'',
                newsFeed: false,
                marketPlace: false,
                showMemberPosts:false

            };
            break;
        case "RELOAD_MEMBER_POSTS":
                state={
                    ...state,
                    reloadMemberPosts:!state.reloadMemberPosts
                };
                break;
        default:
            return state;
    }
    return state;
};

export default accountLoginReducer;