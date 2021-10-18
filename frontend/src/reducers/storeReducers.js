import { 
    CREATE_STORE_FAIL, 
    CREATE_STORE_REQUEST, 
    CREATE_STORE_SUCCESS, 
    GET_SINGLE_STORE_FAIL, 
    GET_SINGLE_STORE_REQUEST, 
    GET_SINGLE_STORE_SUCCESS, 
    GET_STORES_FAIL, 
    GET_STORES_REQUEST,
    GET_STORES_SUCCESS,
    GET_USERSTORE_FAIL,
    GET_USERSTORE_REQUEST,
    GET_USERSTORE_SUCCESS,
} from "../constants/storeConstants";



//define create store reducers
export const createStoreReducer = (state = {}, action) =>{
    switch(action.type){
        case CREATE_STORE_REQUEST:
        return {loading: true}

        case CREATE_STORE_SUCCESS:
        return {loading: false, stores: action.payload}

        case CREATE_STORE_FAIL:
        return {loading: false, error: action.payload}

        default:
        return state
    }
}

//reducer to get all stores
export const getAllStoresReducer = (state ={ loading:true, stores:[] }, action) => {
    switch(action.type) {
        case GET_STORES_REQUEST:
            return {
                loading: true
            };
        case GET_STORES_SUCCESS:
            return {
                loading: false,
                stores: action.payload
            };
        case GET_STORES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

//get single store details reducers
export const getSingleStoreReducers =  (state = {loading:true, store: {}}, action) => {
    switch(action.type) {
        case GET_SINGLE_STORE_REQUEST:
            return {
                loading: true,
            }

        case GET_SINGLE_STORE_SUCCESS:
            return {
                loading: false,
                store: action.payload 
            }

        case GET_SINGLE_STORE_FAIL:
            return {
                loading: false,
                error: action.payload
            } 
               
        default: 
           return state;
    }
}

//get user store reducer
export const getUserStoreReducers = (state = { userStore:{} },action) =>{
    switch(action.type) {
        case GET_USERSTORE_REQUEST:
            return {
                loading: true
            };
        case GET_USERSTORE_SUCCESS:
            return {
                loading: false,
                userStore: action.payload
            };
        case GET_USERSTORE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}