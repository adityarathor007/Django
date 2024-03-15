import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGOUT,
    USER_LOGIN_FAIL
} from '../constants/userConstants'



export const UserLoginReducer = (state = {products:[]},actions) => {
    switch(actions.type){
        case USER_LOGIN_REQUEST:
            return {loading:true}
        
        case USER_LOGIN_SUCCESS:
            return {loading:false,userInfo:actions.payload}

        case USER_LOGIN_FAIL:
            return {loading:false,error:actions.payload}

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

