import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from '../constants/productConstants' //added this so that any changes will be made in the constants in this

export const productListReducers = (state = {products:[]},actions) => {
    switch(actions.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true,products:[]}
        
        case PRODUCT_LIST_SUCCESS:
            return {loading:false,products:actions.payload}

        case PRODUCT_LIST_FAIL:
            return {loading:false,error:actions.payload}

        default:
            return state
    }
}