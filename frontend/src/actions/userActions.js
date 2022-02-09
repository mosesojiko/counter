import Axios from 'axios';
import { 
    USER_CREATE_STORE_FAIL,
    USER_CREATE_STORE_REQUEST,
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
    USER_UPDATE_PROFILE_SUCCESS} from '../constants/userConstants';


// user register function
export const register = (name, email, password, image, terms) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: {name, email, password, image, terms}
    });
    try {
        const { data } = await Axios.post('/api/v1/user/register', {name, email, password, image, terms});
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

//for user profile details
export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({
        type: USER_DETAILS_REQUEST,
        payload: userId
    })
    const { userLogin: { userInfo }} = getState();
    try {
        const { data } = await Axios.get(`/api/v1/user/${userId}`, {
            headers: {
            Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
       
        
    } catch (error) {
        const message = error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type: USER_DETAILS_FAIL, payload: message})
    }
}


//action to update user profile
export const updateUserProfile = (user) => async (dispatch, getState) =>{
    dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
        payload: user
    })
    //get user info
    const { userLogin: {userInfo} } = getState();
    try {
        const { data } = await Axios.put(`/api/v1/user/profile`, user, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        })
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        //also update user login
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type: USER_UPDATE_PROFILE_FAIL, payload: message})
    }
}

//update isSeller for a user that creates a store
export const updateUserCreateStore = (user) => async (dispatch, getState) =>{
    dispatch({
        type: USER_CREATE_STORE_REQUEST,
        payload: user
    })
    //get user info
    const { userLogin: {userInfo} } = getState();
    try {
        const { data } = await Axios.put(`/api/v1/user/createstore`, user, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        })
        dispatch({
            type: USER_CREATE_STORE_SUCCESS,
            payload: data
        })
        //also update user login
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type: USER_CREATE_STORE_FAIL, payload: message})
    }
}




