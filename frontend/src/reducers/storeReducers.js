import { 
    CREATE_STORE_FAIL, 
    CREATE_STORE_RESET,
    CREATE_STORE_REQUEST, 
    CREATE_STORE_SUCCESS, 
    Edit_STORE_FAIL, 
    Edit_STORE_REQUEST, 
    Edit_STORE_RESET, 
    Edit_STORE_SUCCESS, 
    GET_SINGLE_STORE_FAIL, 
    GET_SINGLE_STORE_REQUEST, 
    GET_SINGLE_STORE_SUCCESS, 
    GET_STORES_FAIL, 
    GET_STORES_REQUEST,
    GET_STORES_SUCCESS,
    GET_USERSTORE_FAIL,
    GET_USERSTORE_REQUEST,
    GET_USERSTORE_SUCCESS,
    POST_STORE_FAIL,
    POST_STORE_REQUEST,
    POST_STORE_SUCCESS,
    UNPOST_STORE_FAIL,
    UNPOST_STORE_REQUEST,
    UNPOST_STORE_SUCCESS,
} from "../constants/storeConstants";



//define create store reducers
export const createStoreReducer = (state = {}, action) =>{
    switch(action.type){
        case CREATE_STORE_REQUEST:
        return {loading: true}

        case CREATE_STORE_SUCCESS:
        return {loading: false, success:true}

        case CREATE_STORE_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_STORE_RESET:
            return {}

        default:
        return state
    }
}

//reducer to get all stores
export const getAllStoresReducer = (state ={ loading:true, stores:[], proudcts:[] }, action) => {
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


//edit store reducers
export const editStoreReducers = (state = {}, action) =>{
    switch(action.type) {
        case Edit_STORE_REQUEST:
            return {
                loading: true
            };
        case Edit_STORE_SUCCESS:
            return {
                loading: false, success: true
            };
        case Edit_STORE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case Edit_STORE_RESET:
            return {};
        default:
            return state;
    }
}

//post store reducers
export const editPostedStoreReducer = (state = {}, action) =>{
    switch(action.type) {
        case POST_STORE_REQUEST:
            return {
                loading: true
            }
        case POST_STORE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case POST_STORE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        default:
            return state;
    }
}


//reducer to unpost a store
export const unPostedStoreReducer = (state = {}, action) =>{
    switch(action.type) {
        case UNPOST_STORE_REQUEST:
            return {
                loading: true
            }
        case UNPOST_STORE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case UNPOST_STORE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}