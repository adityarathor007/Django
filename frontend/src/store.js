import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {productListReducers,productDetailsReducers} from './reducers/productReducers'
import {composeWithDevTools} from '@redux-devtools/extension'
import {CartReducer} from './reducers/cartReducers'

const reducer=combineReducers({
    productList:productListReducers,  //this reducer will update the products state
    productDetails:productDetailsReducers,
    cart:CartReducer,

})

const cartItemsfrom_locStorage=localStorage.getItem('cartItems')?
JSON.parse(localStorage.getItem('cartItems')):[]


const middleware = [thunk]

const initialState = {}

const store= createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store