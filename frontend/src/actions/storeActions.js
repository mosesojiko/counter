import Axios from 'axios';
import { 
    CREATE_STORE_FAIL, 
    CREATE_STORE_REQUEST, 
    CREATE_STORE_SUCCESS, 
    GET_SINGLE_STORE_FAIL, 
    GET_SINGLE_STORE_REQUEST, 
    GET_SINGLE_STORE_SUCCESS, 
    GET_STORES_FAIL, 
    GET_STORES_REQUEST, 
    GET_STORES_SUCCESS,
    GET_USERSTORE_FAIL,
    GET_USERSTORE_REQUEST,
    GET_USERSTORE_SUCCESS, 
} from '../constants/storeConstants';

//create a store 
export const createStore = (name, address, city, description, image, 
    storeCreatorId, storeCreatorName, storeCreatorPhone, storeCreatorEmail, storeCreatorImage, user) => async (dispatch, getState) => {
    dispatch({
        type: CREATE_STORE_REQUEST,
        payload: {name, address, city, description, image, 
            storeCreatorId, storeCreatorName, storeCreatorPhone, storeCreatorEmail, storeCreatorImage, user}
    })
    try {
        // get userInfo from redux store
        const { userLogin: { userInfo }, } = getState() //getState returns the whole redux store
        const { data } = await Axios.post('/api/v1/store/createstore', ({name, address, city, description, image, storeCreatorId, storeCreatorName, storeCreatorPhone, storeCreatorEmail, storeCreatorImage, user}),{
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: CREATE_STORE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: CREATE_STORE_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message : error.message,
        })
    }
}


//get all stores
export const getStores = () => async (dispatch) =>{
    dispatch ({
        type: GET_STORES_REQUEST
    })
    //fetching data from backend
    try {;
        const { data } = await Axios.get('/api/v1/store');
        dispatch({
            type: GET_STORES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_STORES_FAIL,
            payload: error.message
        })
    }
}


//get single store, get store details
export const getSingleStore = (storeId) => async (dispatch) => {
    dispatch({
        type: GET_SINGLE_STORE_REQUEST,
        payload: storeId
    });
    try {
        const { data } = await Axios.get(`/api/v1/store/${storeId}`);
        dispatch({
            type: GET_SINGLE_STORE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_SINGLE_STORE_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message: error.message,
        })
    }
}

//get userstore action
export const getUserStore = () => async (dispatch, getState) => {
    dispatch({
        type: GET_USERSTORE_REQUEST
    });
    //get userInfo
    const { userLogin: { userInfo }} = getState();
    try {
        const { data } = await Axios.get('/api/v1/store/userstore', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: GET_USERSTORE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_USERSTORE_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message: error.message,
        })
    }
}
