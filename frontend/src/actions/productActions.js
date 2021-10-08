//product actions
import Axios from "axios"
import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, LIST_OF_PRODUCTS_FAIL, 
    LIST_OF_PRODUCTS_REQUEST, 
    LIST_OF_PRODUCTS_SUCCESS, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";


    //create a product 
export const createProduct = (name, price, category, image, countInStock, brand, rating, numReviews, description) => async (dispatch) => {
    dispatch({
        type: CREATE_PRODUCT_REQUEST,
        payload: {name, price, category, image, countInStock, brand, rating, numReviews, description}
    })
    try {
        const { data } = await Axios.post('/api/v1/product/create', {name, price, category, image, countInStock, brand, rating, numReviews, description});
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message : error.message,
        })
    }
}

//define actions, get all products
export const getAllProducts = () => async (dispatch) =>{
    dispatch ({
        type: LIST_OF_PRODUCTS_REQUEST
    })
    //fetching data from backend
    try {;
        const { data } = await Axios.get('/api/v1/product');
        dispatch({
            type: LIST_OF_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LIST_OF_PRODUCTS_FAIL,
            payload: error.message
        })
    }
}

//get details of a product
export const getProductDetails = (productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
        payload: productId
    });
    try {
        const { data } = await Axios.get(`/api/v1/product/${productId}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message?
            error.response.data.message: error.message,
        })
    }
}