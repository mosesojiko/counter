import { 
    ADD_TO_BASKET, 
    BASKET_EMPTY, 
    BASKET_SAVE_PAYMENT_METHOD, 
    BASKET_SAVE_SHIPPING_ADDRESS, 
    REMOVE_FROM_BASKET } from "../constants/basketConstants";


export const basketReducer = (state = {basketItems:[]}, action) => {
    switch(action.type) {
        case ADD_TO_BASKET:
            const item = action.payload;
            const foundItem = state.basketItems.find((x) => x.product === item.product);

            if(foundItem) {
                return {
                    ...state,
                    basketItems: state.basketItems.map((x) => x.product === foundItem.product? item : x)
                }
            }else {
                return {
                    ...state,
                    basketItems: [...state.basketItems, item]
                }
            }

        case REMOVE_FROM_BASKET:
            return {
                ...state,
                basketItems: state.basketItems.filter((x) => x.product !== action.payload)
            }
        case BASKET_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case BASKET_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case BASKET_EMPTY:
            return {
                ...state,
                basketItems: []
            }

        default:
            return state;
    }
}