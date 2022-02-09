import Axios from 'axios';
import { CREATE_WITHDRAW_FAIL, CREATE_WITHDRAW_REQUEST, CREATE_WITHDRAW_SUCCESS, GET_WITHDRAWAL_FAIL, GET_WITHDRAWAL_REQUEST, GET_WITHDRAWAL_SUCCESS } from "../constants/withdrawConstants"

//create a widthdraw
export const createWithdraw = (accountName, accountNumber, bank, amount, email, phone, productId) => async(dispatch, getState) =>{
    dispatch({
        type: CREATE_WITHDRAW_REQUEST,
        payload: {accountName, accountNumber, bank, amount, email, phone, productId}
    })
    // get userInfo from redux store
    const { userLogin: { userInfo }, } = getState()

    try {
        const { data } = await Axios.post('/api/v1/withdraw/create', {accountName, accountNumber, bank, amount, email, phone, productId}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type: CREATE_WITHDRAW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_WITHDRAW_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message : error.message,
        })
    }
}


//return my widthdrawals
export const getWithdrawals = () =>async(dispatch, getState) =>{
    dispatch({
        type: GET_WITHDRAWAL_REQUEST
    })
//get userInfo
    const { userLogin: { userInfo }} = getState();
    try {
        const { data } = await Axios.get('/api/v1/withdraw/mywithdrawals', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: GET_WITHDRAWAL_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        const message = error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type: GET_WITHDRAWAL_FAIL, payload: message})
    }
}
