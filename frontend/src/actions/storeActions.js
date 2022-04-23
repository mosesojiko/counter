import Axios from 'axios';
import { 
    CREATE_STORE_FAIL, 
    CREATE_STORE_REQUEST, 
    CREATE_STORE_SUCCESS, 
    Edit_STORE_FAIL, 
    Edit_STORE_REQUEST, 
    Edit_STORE_SUCCESS, 
    GET_SINGLE_STORE_FAIL, 
    GET_SINGLE_STORE_REQUEST, 
    GET_SINGLE_STORE_SUCCESS, 
    GET_STORES_FAIL, 
    GET_STORES_REQUEST, 
    GET_STORES_SUCCESS,
    GET_USERSTORE_FAIL,
    GET_USERSTORE_REQUEST,
    GET_USERSTORE_SUCCESS,
    POST_STORE_REQUEST,
    POST_STORE_SUCCESS,
    POST_STORE_FAIL,
    UNPOST_STORE_REQUEST,
    UNPOST_STORE_SUCCESS,
    UNPOST_STORE_FAIL,
    //GET_BIZ_STORE_REQUEST,
    //GET_BIZ_STORE_SUCCESS,
    //GET_BIZ_STORE_FAIL, 
} from '../constants/storeConstants';

//create a store 
export const createStore = (name, address, category, city, state, country, description, image, deliveryCapacity, creatorId, creatorName, creatorEmail, creatorPhone, creatorImage, businessName) => async (dispatch, getState) => {
    dispatch({
        type: CREATE_STORE_REQUEST,
        payload: {name, address, category, city, state, country, description, image, deliveryCapacity, creatorId, creatorName, creatorEmail, creatorPhone,creatorImage, businessName}
    })
    try {
        // get userInfo from redux store
        const { userLogin: { userInfo }, } = getState() //getState returns the whole redux store
        const { data } = await Axios.post('/api/v1/store/createstore', {name, address, category, city, state, country, description, image, deliveryCapacity, creatorId, creatorName, creatorEmail, creatorPhone, creatorImage, businessName},{
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


//get single store, get store details
// export const getBizNameStore = (name) => async (dispatch) => {
//     dispatch({
//         type: GET_BIZ_STORE_REQUEST,
//         payload: name
//     });
//     try {
//         const { data } = await Axios.get(`/api/v1/store/bizname`, {name});
//         dispatch({
//             type: GET_BIZ_STORE_SUCCESS,
//             payload: data
//         })
//     } catch (error) {
//         dispatch({
//             type: GET_BIZ_STORE_FAIL,
//             payload: error.response && error.response.data.message?
//             error.response.data.message: error.message,
//         })
//     }
// }




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

//edit user store actions
export const editStore = (id) => async (dispatch, getState) => {
    dispatch({
        type: Edit_STORE_REQUEST,
        payload: id
    });
    try {
        //get user info
    const { userLogin: {userInfo} } = getState();
    const { data } = await Axios.put(`/api/v1/store/editstore`, id, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        },
    });
    dispatch({
        type: Edit_STORE_SUCCESS,
        payload: data
    })
        
    } catch (error) {
        const message = error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type: Edit_STORE_FAIL, payload: message})
    }
}

//edit a store to be posted
export const editPostedStore = (id) => async(dispatch, getState) => {
    dispatch({
        type: POST_STORE_REQUEST,
        payload: id
    })
    //get user info
    const { userLogin: {userInfo} } = getState();
    try {
        const { data } = await Axios.put(`/api/v1/store/poststore`, id, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        })
        dispatch({
            type: POST_STORE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        const message = error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type: POST_STORE_FAIL, payload: message})
    }
}

//edit a store to be unposted or removed from store
export const unPostedStore = (id) => async(dispatch, getState) => {
    dispatch({
        type: UNPOST_STORE_REQUEST,
        payload: id
    })
    //get user info
    const { userLogin: {userInfo} } = getState();
    try {
        const { data } = await Axios.put(`/api/v1/store/unpoststore`, id, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        })
        dispatch({
            type: UNPOST_STORE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        const message = error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type: UNPOST_STORE_FAIL, payload: message})
    }
}