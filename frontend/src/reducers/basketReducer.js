import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from "../constants/basketConstants";


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

        default:
            return state;
    }
}