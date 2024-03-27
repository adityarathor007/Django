import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {productListReducers
        ,productDetailsReducer
        ,productDeleteReducers
        ,productCreateReducers
        ,productUpdateReducers
        ,productCreateReviewReducers
    } from './reducers/productReducers'
import {composeWithDevTools} from '@redux-devtools/extension'
import {CartReducer} from './reducers/cartReducers'
import {UserLoginReducer,
        userRegisterReducer,
        userDetailsReducer,
        userUpdateProfileReducer,
        userListReducer,
        userDeleteReducer,
        userUpdateReducer} from './reducers/userReducers'
import {orderConstantsReducer,
        orderDetailsReducer,
        orderPayReducer,
        orderDeliverReducer,
        orderListMyReducer,
        orderListReducer} from './reducers/orderReducers'


const reducer=combineReducers({
    productList:productListReducers,  //this reducer will update the products state
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducers,
    productCreate:productCreateReducers,
    productUpdate:productUpdateReducers,
    productReviewCreate:productCreateReviewReducers,
    
    cart:CartReducer,

    userLogin:UserLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,

    
    orderCreate:orderConstantsReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderDeliver:orderDeliverReducer,
    orderListMy:orderListMyReducer,
    orderList:orderListReducer,

    




})

const cartItemsfrom_locStorage=localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')):[]


const userInfofrom_locStorage=localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):null //this is done to ensure that whenver we reload the it gets info from the local storage


const shippingAddressFromlocStorage=localStorage.getItem('shippingAddress')?
    JSON.parse(localStorage.getItem('shippingAddress')):{}   //loading the previous stored address


const middleware = [thunk]

const initialState = {
    cart:{
        cartItems:cartItemsfrom_locStorage,
        shippingAddress:shippingAddressFromlocStorage
    },  //as shipping address is related to the items in the cart
    userLogin:{userInfo:userInfofrom_locStorage},
}
    

const store= createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store