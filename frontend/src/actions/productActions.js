//product actions
import Axios from "axios"
import { LIST_OF_PRODUCTS_FAIL, LIST_OF_PRODUCTS_REQUEST, LIST_OF_PRODUCTS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";

//define actions, get all products
export const getAllProducts = () => async (dispatch) =>{
    dispatch ({
        type: LIST_OF_PRODUCTS_REQUEST
    })
    //fetching data from backend
    try {;
        const { data } = await Axios.get('/api/v1/products');
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
        const { data } = await Axios.get(`/api/v1/products/${productId}`);
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