import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {productListReducers,productDetailsReducers} from './reducers/productReducers'
import {composeWithDevTools} from '@redux-devtools/extension'
import {CartReducer} from './reducers/cartReducers'
import {UserLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer} from './reducers/userReducers'
import {orderConstantsReducer,orderDetailsReducer} from './reducers/orderReducers'


const reducer=combineReducers({
    productList:productListReducers,  //this reducer will update the products state
    productDetails:productDetailsReducers,
    cart:CartReducer,
    userLogin:UserLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderConstantsReducer,
    orderDetails:orderDetailsReducer,


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