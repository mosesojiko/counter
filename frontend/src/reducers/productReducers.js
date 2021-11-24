//product reducers

import { 
    CREATE_PRODUCT_FAIL, 
    CREATE_PRODUCT_REQUEST, 
    CREATE_PRODUCT_SUCCESS, 
    GET_PRODUCT_FOR_UPDATE_FAIL, 
    GET_PRODUCT_FOR_UPDATE_REQUEST, 
    GET_PRODUCT_FOR_UPDATE_RESET, 
    GET_PRODUCT_FOR_UPDATE_SUCCESS, 
    LIST_OF_PRODUCTS_FAIL, 
    LIST_OF_PRODUCTS_REQUEST, 
    LIST_OF_PRODUCTS_SUCCESS, 
    POST_PRODUCT_FAIL, 
    POST_PRODUCT_REQUEST, 
    POST_PRODUCT_SUCCESS, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS,
    UNPOST_PRODUCT_FAIL,
    UNPOST_PRODUCT_REQUEST,
    UNPOST_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS,
    USER_PRODUCTS_FAIL,
    USER_PRODUCTS_REQUEST,
    USER_PRODUCTS_SUCCESS, 
} from "../constants/productConstants";


//define create product reducers
export const createProductReducer = (state = {}, action) =>{
    switch(action.type){
        case CREATE_PRODUCT_REQUEST:
        return {loading: true}

        case CREATE_PRODUCT_SUCCESS:
        return {loading: false,success: true, product: action.payload}

        case CREATE_PRODUCT_FAIL:
        return {loading: false, error: action.payload}

        default:
        return state
    }
}

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

//get user products reducers
export const getUserProductsReducer = (state = {loading:true, userProducts:[]}, action) =>{
    switch(action.type) {
        case USER_PRODUCTS_REQUEST:
            return {
                loading: true
            };
        case USER_PRODUCTS_SUCCESS:
            return {
                loading: false,
                userProducts: action.payload
            }
        case USER_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}


//get user product for update
export const findProductForUpdateReducer =  (state = {loading:true, product: {}}, action) => {
    switch(action.type) {
        case GET_PRODUCT_FOR_UPDATE_REQUEST:
            return {
                loading: true,
            }

        case GET_PRODUCT_FOR_UPDATE_SUCCESS:
            return {
                loading: false,
                product: action.payload 
            }

        case GET_PRODUCT_FOR_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            } 
        case GET_PRODUCT_FOR_UPDATE_RESET:
            return {}
               
        default: 
           return state;
    }
}



//reducer to update user profile
export const updateUserProductReducer = (state = {}, action) =>{
    switch(action.type){
        case UPDATE_PRODUCT_REQUEST:
            return { loading: true};

        case UPDATE_PRODUCT_SUCCESS:
            return { loading: false, success: true };
            
        case UPDATE_PRODUCT_FAIL: 
            return { loading: false, error: action.payload };

        case UPDATE_PRODUCT_RESET:
            return {};    
            
        default : 
         return state;   
    }
}

//post product reducers
export const editPostedProductReducer = (state = {}, action) =>{
    switch(action.type) {
        case POST_PRODUCT_REQUEST:
            return {
                loading: true
            }
        case POST_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case POST_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


//reducer to unpost a store
export const unPostedProductReducer = (state = {}, action) =>{
    switch(action.type) {
        case UNPOST_PRODUCT_REQUEST:
            return {
                loading: true
            }
        case UNPOST_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case UNPOST_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
