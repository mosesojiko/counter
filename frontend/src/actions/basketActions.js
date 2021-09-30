import Axios from 'axios';
import { 
    ADD_TO_BASKET, 
    BASKET_SAVE_PAYMENT_METHOD, 
    BASKET_SAVE_SHIPPING_ADDRESS, 
    REMOVE_FROM_BASKET } from '../constants/basketConstants';


export const addToBasket = (productId, qty) => async(dispatch, getState) => {
    //send axios request to get information of this product
    const { data } = await Axios.get(`/api/v1/product/${productId}`)
    dispatch({
        type: ADD_TO_BASKET,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty,
        },
    });
    localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems));
}

//function to remove form basket
export const removeFromBasket = (productId) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_BASKET,
        payload: productId
    })
    localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems))
}

// function to saveShippingAddress
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: BASKET_SAVE_SHIPPING_ADDRESS,
        payload: data
    });
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

//Payment method
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: BASKET_SAVE_PAYMENT_METHOD,
        payload: data
    })
} 
