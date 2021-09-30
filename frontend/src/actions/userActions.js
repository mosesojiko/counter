import Axios from 'axios';
import { 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS} from '../constants/userConstants';


// user register function
export const register = (name, email, password) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: {name, email, password}
    });
    try {
        const { data } = await Axios.post('/api/v1/user/register', {name, email, password});
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message : error.message,
        })
    }
}

//login function
export const login = (email, password) => async (dispatch) => {
    dispatch({
        type: USER_LOGIN_REQUEST,
        payload: { email, password }
    });

    try {
        const { data } = await Axios.post("/api/v1/user/login", {email, password});
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message : error.message,
        })
    }
}

//logout function
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('basketItems');
    localStorage.removeItem('shippingAddress');
    
    dispatch({
        type: USER_LOGOUT
    });
    
}