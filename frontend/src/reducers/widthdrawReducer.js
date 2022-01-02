import { CREATE_WIDTHDRAW_FAIL, CREATE_WIDTHDRAW_REQUEST, CREATE_WIDTHDRAW_RESET, CREATE_WIDTHDRAW_SUCCESS, GET_WIDTHDRAWAL_FAIL, GET_WIDTHDRAWAL_REQUEST, GET_WIDTHDRAWAL_SUCCESS } from "../constants/widthdrawConstants";

//create widthdraw reducer
export const createWidthdrawReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_WIDTHDRAW_REQUEST:
            return {
                loading: true
            }
        case CREATE_WIDTHDRAW_SUCCESS:
            return {
                loading: false,
                success: true,
                widthdraw: action.payload
            }
        case CREATE_WIDTHDRAW_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_WIDTHDRAW_RESET:
            return {};
        default:
            return state;
    }
}


//reducer for history of widthdrawals
export const getWidthdrawalsReducer = (state = { widthdraws: []}, action) =>{
    switch(action.type) {
        case GET_WIDTHDRAWAL_REQUEST:
            return { loading: true };

        case GET_WIDTHDRAWAL_SUCCESS:
            return { loading: false, widthdraws: action.payload };  
            
        case GET_WIDTHDRAWAL_FAIL:
            return { loading: false, error: action.payload };    

        default:
            return state;    
    }
}