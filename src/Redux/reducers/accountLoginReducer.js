const initialState =  {
    status: false,
    userInfo:'',
    email:'',
    newsFeed: false,
    marketPlace: false,
    filters_disabled:false
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
                newsFeed:true
            };
            break;
        case "MEMBER_MARKETPLACE_SWITCH":
            state={
                ...state,
                marketPlace:true,
                newsFeed:false
            };
            break;
        default:
            return state;
    }
    return state;
};

export default accountLoginReducer;