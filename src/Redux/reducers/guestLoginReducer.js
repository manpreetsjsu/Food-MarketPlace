const initialState =  {
    status : false,
    newsFeed: false,
    marketPlace: false,
    filters_disabled:false
};

const guestLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GUEST_MARKETPLACE":
            state = {
                ...state,
                status: true,
                marketPlace:true,
                newsFeed:false,
            };
            break;
        case "GUEST_NEWSFEED":
            state = {
                ...state,
                marketPlace:false,
                newsFeed:true,
                filters_disabled:true
            };
            break;
        default:
            return state;
    }
    return state;
};

export default guestLoginReducer;