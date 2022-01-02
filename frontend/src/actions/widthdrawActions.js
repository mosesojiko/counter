import Axios from 'axios';
import { CREATE_WIDTHDRAW_FAIL, CREATE_WIDTHDRAW_REQUEST, CREATE_WIDTHDRAW_SUCCESS, GET_WIDTHDRAWAL_FAIL, GET_WIDTHDRAWAL_REQUEST, GET_WIDTHDRAWAL_SUCCESS } from "../constants/widthdrawConstants"

//create a widthdraw
export const createWidthdraw = (accountName, accountNumber, bank, amount, email, phone, productId) => async(dispatch, getState) =>{
    dispatch({
        type: CREATE_WIDTHDRAW_REQUEST,
        payload: {accountName, accountNumber, bank, amount, email, phone, productId}
    })
    // get userInfo from redux store
    const { userLogin: { userInfo }, } = getState()

    try {
        const { data } = await Axios.post('/api/v1/widthdraw/create', {accountName, accountNumber, bank, amount, email, phone, productId}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type: CREATE_WIDTHDRAW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_WIDTHDRAW_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message : error.message,
        })
    }
}


//return my widthdrawals
export const getWidthdrawals = () =>async(dispatch, getState) =>{
    dispatch({
        type: GET_WIDTHDRAWAL_REQUEST
    })
//get userInfo
    const { userLogin: { userInfo }} = getState();
    try {
        const { data } = await Axios.get('/api/v1/widthdraw/mywidthdrawals', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: GET_WIDTHDRAWAL_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        const message = error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type: GET_WIDTHDRAWAL_FAIL, payload: message})
    }
}
