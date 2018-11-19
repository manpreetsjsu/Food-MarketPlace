
// store config
import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import guestLogin from './reducers/guestLoginReducer';
import accountLogin from './reducers/accountLoginReducer';
import marketPlace from './reducers/marketPlaceReducer';
import thunk from 'redux-thunk';

const store= createStore(
    combineReducers({
    guestLogin,accountLogin,marketPlace
    }),
    {},
    applyMiddleware(logger,thunk)
);
export  default  store;