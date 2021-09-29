import {compose, applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { basketReducer } from './reducers/basketReducer';
import { getAllProductReducer, getProductDetailsReducers } from './reducers/productReducers';
import { userLoginReducer } from './reducers/userReducer';


const initialState = {
    userLogin: {
        userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    basket: {
        basketItems: localStorage.getItem('basketItems')? JSON.parse(localStorage.getItem('basketItems')) : []
    },
};

const reducer = combineReducers({
    //introduce reducers to reducer store
    getProducts: getAllProductReducer,
    productDetails: getProductDetailsReducers,
    basket: basketReducer,
    userLogin: userLoginReducer,
})
//to show store in the console
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//create store
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store