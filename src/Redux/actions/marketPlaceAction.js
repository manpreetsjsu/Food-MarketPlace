export function marketPlace_RESET(reset_filter_payload) {
    return{
        type:"MARKETPLACE_RESET",
        payload:reset_filter_payload
    }
}

export function set_location(location){
    return{
        type:"SET_LOCATION",
        payload: location
    }
}
export function change_filters_state(current_filter_payload) {
    return{
        type:"MARKETPLACE_FILTERS",
        payload:current_filter_payload
    }
}

export function set_loading_status(flag){
    return{
        type: "LOADING_STATUS",
        payload:flag
    }
}

export function set_filters_status(flag){
    return{
        type: "FILTERS_STATUS",
        payload:flag
    }
}