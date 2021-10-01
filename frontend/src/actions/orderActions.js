import Axios from 'axios';
import { BASKET_EMPTY } from '../constants/basketConstants';
import { 
    CREATE_ORDER_FAIL, 
    CREATE_ORDER_REQUEST, 
    CREATE_ORDER_SUCCESS } from '../constants/orderConstants';


export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({
        type: CREATE_ORDER_REQUEST,
        payload: order
    });

    try {
        // get userInfo from redux store
        const { userLogin: { userInfo } } = getState() //getState returns the whole redux store
        const { data } = await Axios.post('/api/v1/order', order, {
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