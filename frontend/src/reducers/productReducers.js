//product reducers

import { LIST_OF_PRODUCTS_FAIL, LIST_OF_PRODUCTS_REQUEST, LIST_OF_PRODUCTS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";


//define product list reducers
export const getAllProductReducer = (state = {loading:true, products:[] }, action) =>{
    switch(action.type){
        case LIST_OF_PRODUCTS_REQUEST:
        return {loading: true};

        case LIST_OF_PRODUCTS_SUCCESS:
        return {loading: false, products: action.payload}

        case LIST_OF_PRODUCTS_FAIL:
        return {loading: false, error: action.payload}

        default:
        return state
    }
}

//get product details reducers
export const getProductDetailsReducers =  (state = {loading:true, product: {}}, action) => {
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
            }

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload 
            }

        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            } 
               
        default: 
           return state;
    }
}