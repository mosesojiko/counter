import Axios from 'axios';
import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from '../constants/basketConstants';


export const addToBasket = (productId, qty) => async(dispatch, getState) => {
    //send axios request to get information of this product
    const { data } = await Axios.get(`/api/v1/products/${productId}`)
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