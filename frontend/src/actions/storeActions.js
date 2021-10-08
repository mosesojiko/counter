import Axios from 'axios';
import { 
    CREATE_STORE_FAIL, 
    CREATE_STORE_REQUEST, 
    CREATE_STORE_SUCCESS, 
    GET_STORES_FAIL, 
    GET_STORES_REQUEST, 
    GET_STORES_SUCCESS 
} from '../constants/storeConstants';

//create a store 
export const createStore = (name, address, city, description, image,) => async (dispatch) => {
    dispatch({
        type: CREATE_STORE_REQUEST,
        payload: {name, address, city, description, image}
    })
    try {
        const { data } = await Axios.post('/api/v1/store/createstore', {name, address, city, description, image});
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