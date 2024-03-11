import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {productListReducers} from './reducers/productReducers'
import {composeWithDevTools} from '@redux-devtools/extension'

const reducer=combineReducers({
    productList:productListReducers,  //this reducer will update the products state
})

const middleware = [thunk]

const initialState = {}

const store= createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store