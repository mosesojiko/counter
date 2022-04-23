import { 
    CREATE_ORDER_FAIL, 
    CREATE_ORDER_REQUEST, 
    CREATE_ORDER_RESET, 
    CREATE_ORDER_SUCCESS, 
    ORDER_DETAILS_FAIL, 
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_NOTIFICATION_FAIL,
    ORDER_NOTIFICATION_REQUEST,
    ORDER_NOTIFICATION_RESET,
    ORDER_NOTIFICATION_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS} from "../constants/orderConstants";



//create order reducer
export const createOrderReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_ORDER_RESET:
            return {};
        default:
            return state;
    }
}

//order details reducer
export const orderDetailsReducer = (state = {loading: true}, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

//order pay reducer
export const orderPayReducer = (state = {}, action) =>{
    switch(action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            };
        case ORDER_PAY_SUCCESS:
            return {
                loading: false, success: true
            };
        case ORDER_PAY_FAIL:
            return {
                loading: false, error: action.payload
            };
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
}

//reducer for history of orders
export const orderMineListReducer = (state = { orders: []}, action) =>{
    switch(action.type) {
        case ORDER_MINE_LIST_REQUEST:
            return { loading: true };

        case ORDER_MINE_LIST_SUCCESS:
            return { loading: false, orders: action.payload };  
            
        case ORDER_MINE_LIST_FAIL:
            return { loading: false, error: action.payload };    

        default:
            return state;    
    }
}


//order notification reducer
export const orderNotificationReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_NOTIFICATION_REQUEST:
            return {
                loading: true
            };
        case ORDER_NOTIFICATION_SUCCESS:
            return {
                loading: false, success: true
            };
        case ORDER_NOTIFICATION_FAIL:
            return {
                loading: false, error: action.payload
            };
        case ORDER_NOTIFICATION_RESET:
            return {};
        default:
            return state;
    }
}

