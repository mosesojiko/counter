import { 
    USER_CREATE_STORE_FAIL,
    USER_CREATE_STORE_REQUEST,
    USER_CREATE_STORE_RESET,
    USER_CREATE_STORE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_SUCCESS} from "../constants/userConstants";


//register reducer
export const userRegisterReducer = (state = {}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return { loading: true};

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
            
        case USER_REGISTER_FAIL: 
            return { loading: false, error: action.payload };

         default : 
         return state;   
    }
}

//login reducer
export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
            };
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            };
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case USER_LOGOUT:
            return {};

        default:
            return state;
    }
}

//for user profile details
export const userDetailsReducer = (state = {loading: true}, action) =>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return { loading: true};

        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
            
        case USER_DETAILS_FAIL: 
            return { loading: false, error: action.payload };
            

         default : 
         return state;   
    }
}


//reducer to update user profile
export const userUpdateProfileReducer = (state = {}, action) =>{
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true};

        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true };
            
        case USER_UPDATE_PROFILE_FAIL: 
            return { loading: false, error: action.payload };

        case USER_UPDATE_PROFILE_RESET:
            return {};    
            
        default : 
         return state;   
    }
}

//reducer to update user that creates a store
export const updateUserCreateStoreReducer = (state = {}, action) =>{
    switch(action.type){
        case USER_CREATE_STORE_REQUEST:
            return { loading: true};

        case USER_CREATE_STORE_SUCCESS:
            return { loading: false, success: true };
            
        case USER_CREATE_STORE_FAIL: 
            return { loading: false, error: action.payload };
        case USER_CREATE_STORE_RESET:
            return {};
        default : 
         return state;   
    }
}

