const initialState =  {
    isLoading:false,
    reset:false,
    enableFilters:true,
    location:'',
    filters:{
        Fruits: true,
        Vegetables: true,
        HomeCooked: true,
        GreenWaste: true,
        Other: true,

    }
};

const marketPlaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case "MARKETPLACE_RESET":
            state = {
                ...state,
                reset: !state.reset,
                location: "",
                filters: {
                    Fruits: true,
                    Vegetables: true,
                    HomeCooked: true,
                    GreenWaste: true,
                    Other: true,
                }
            };
            break;
        case "MARKETPLACE_FILTERS":
            state={
                ...state,
                filters:action.payload
            };
            break;
        case "SET_LOCATION":
            state={
                ...state,
                location:action.payload
            };
            break;
        case "LOADING_STATUS":
            state={
                ...state,
                isLoading:action.payload
            };
            break;
        case "FILTERS_STATUS":
            state={
                ...state,
                enableFilters:action.payload
            };
            break;
        default:
            return state;
    }
    return state;
};

export default marketPlaceReducer;
