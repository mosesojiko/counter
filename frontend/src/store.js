import {compose, applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { getAllProductReducer, getProductDetailsReducers } from './reducers/productReducers';


const initialState = {};

const reducer = combineReducers({
    //introduce reducers to reducer store
    getProducts: getAllProductReducer,
    productDetails: getProductDetailsReducers,
})
//to show store in the console
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//create store
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store