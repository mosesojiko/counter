import Axios from 'axios';
import { BASKET_EMPTY } from '../constants/basketConstants';
import { 
    CREATE_ORDER_FAIL, 
    CREATE_ORDER_REQUEST, 
    CREATE_ORDER_SUCCESS, 
    ORDER_DETAILS_FAIL, 
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS} from '../constants/orderConstants';


export const createOrder = (order, sellerEmail) => async (dispatch, getState) => {
    dispatch({
        type: CREATE_ORDER_REQUEST,
        payload: {order, sellerEmail}
    });

    try {
        // get userInfo from redux store
        const { userLogin: { userInfo }, } = getState() //getState returns the whole redux store
        const { data } = await Axios.post('/api/v1/order',  order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data.order
        });
        dispatch({
            type: BASKET_EMPTY,
        });
        localStorage.removeItem('basketItems')
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message : error.message,
        })
    }
}

//define orderDetails function
export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_DETAILS_REQUEST,
        payload: orderId
    });
    const {userLogin: { userInfo }, } = getState();

    try {
        const { data } = await Axios.get(`/api/v1/order/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message
        })
    }
}

//PAY ORDER ACTIONS
export const payOrder = (order, paymentResult, sellerEmail ) => async (dispatch, getState) =>{
    dispatch({
        type: ORDER_PAY_REQUEST,
        payload: {order, paymentResult, sellerEmail}
    });
    //get user info
    const { userLogin: { userInfo },} = getState();
    try {
        const { data } = await Axios.put(`/api/v1/order/${order._id}/pay`, {paymentResult, sellerEmail}, {
            headers: { Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message
        })
    }
}

//return my orders
export const listOrderMine = () =>async(dispatch, getState) =>{
    dispatch({
        type: ORDER_MINE_LIST_REQUEST
    })
//get userInfo
    const { userLogin: { userInfo }} = getState();
    try {
        const { data } = await Axios.get('/api/v1/order/mine', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: ORDER_MINE_LIST_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        const message = error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type: ORDER_MINE_LIST_FAIL, payload: message})
    }
}


