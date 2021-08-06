import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
} from '../constants/cartConstants';

export const cartReducer = (state={cartItems:[]},action)=>{
    const{type,payload} = action;
    switch (type) {
        case CART_ADD_ITEM:
            const item = payload;
            const existItem = state.cartItems.find(itm=>itm.product===item.product); //check if item to be added is already there or not
            if(existItem){ //if already there
                return {
                    ...state,
                    cartItems:state.cartItems.map(itm=>itm.product===existItem.product ? item : itm)
                };
            }
            return {
                ...state,
                cartItems:[...state.cartItems,item]
            };
        default:
            return state;
    }
}