import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {productListReducers,productDetailsReducers} from './reducers/productReducers'
import {composeWithDevTools} from '@redux-devtools/extension'
import {CartReducer} from './reducers/cartReducers'
import {UserLoginReducer} from './reducers/userReducers'

const reducer=combineReducers({
    productList:productListReducers,  //this reducer will update the products state
    productDetails:productDetailsReducers,
    cart:CartReducer,
    userLogin:UserLoginReducer,

})

const cartItemsfrom_locStorage=localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')):[]


const userInfofrom_locStorage=localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):null //this is done to ensure that whenver we reload the it gets info from the local storage


const middleware = [thunk]

const initialState = {
    cart:{cartItem:cartItemsfrom_locStorage},
    userLogin:{userInfo:userInfofrom_locStorage}
}

const store= createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store