import { CREATE_WITHDRAW_FAIL, CREATE_WITHDRAW_REQUEST, CREATE_WITHDRAW_RESET, CREATE_WITHDRAW_SUCCESS, GET_WITHDRAWAL_FAIL, GET_WITHDRAWAL_REQUEST, GET_WITHDRAWAL_SUCCESS } from "../constants/withdrawConstants";

//create widthdraw reducer
export const createWithdrawReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_WITHDRAW_REQUEST:
            return {
                loading: true
            }
        case CREATE_WITHDRAW_SUCCESS:
            return {
                loading: false,
                success: true,
                withdraw: action.payload
            }
        case CREATE_WITHDRAW_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_WITHDRAW_RESET:
            return {};
        default:
            return state;
    }
}


//reducer for history of widthdrawals
export const getWithdrawalsReducer = (state = { withdraws: []}, action) =>{
    switch(action.type) {
        case GET_WITHDRAWAL_REQUEST:
            return { loading: true };

        case GET_WITHDRAWAL_SUCCESS:
            return { loading: false, withdraws: action.payload };  
            
        case GET_WITHDRAWAL_FAIL:
            return { loading: false, error: action.payload };    

        default:
            return state;    
    }
}