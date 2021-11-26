import {compose, applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { basketReducer } from './reducers/basketReducer';
import { createOrderReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducers';
import { createProductReducer, editPostedProductReducer, findProductForUpdateReducer, getAllProductReducer, getOrderedProductsReducer, getProductDetailsReducers, getUserProductsReducer, orderedProductReducer, unPostedProductReducer, updateUserProductReducer } from './reducers/productReducers';
import { createStoreReducer, editPostedStoreReducer, editStoreReducers, getAllStoresReducer, getSingleStoreReducers, getUserStoreReducers, unPostedStoreReducer } from './reducers/storeReducers';
import { updateUserCreateStoreReducer, userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducer';


const initialState = {
    userLogin: {
        userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null,
    },
    basket: {
        basketItems: localStorage.getItem('basketItems')? JSON.parse(localStorage.getItem('basketItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod: "Paystack",
    },
    
};

const reducer = combineReducers({
    //introduce reducers to reducer store
    getProducts: getAllProductReducer,
    productDetails: getProductDetailsReducers,
    basket: basketReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    orderCreate: createOrderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    createdStore: createStoreReducer,
    getAllStores: getAllStoresReducer,
    productCreate: createProductReducer,
    storeDetails: getSingleStoreReducers,
    userStoreDetails: getUserStoreReducers,
    userCreateStore: updateUserCreateStoreReducer,
    editUserStore: editStoreReducers,
    postedStore: editPostedStoreReducer,
    unpostStore: unPostedStoreReducer,
    userproducts: getUserProductsReducer,
    productForUpdate: findProductForUpdateReducer,
    updateProduct: updateUserProductReducer,
    postedProduct: editPostedProductReducer,
    unpostProduct: unPostedProductReducer,
    productOrdered: orderedProductReducer,
    customerOrders: getOrderedProductsReducer,
})
//to show store in the console
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//create store
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store