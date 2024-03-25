import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
} from '../constants/productConstants'
import axios from 'axios'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})

        const {data}= await axios.get(`/api/products`)  //making request to the backend
        console.log(data)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data  // loading the state with data 
        })

    }
    
    catch(error){
            dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.detail 
            ? error.response.data.detail
            :error.message, //passing the error 
        })
    }
    
         
}


export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST})

        const {data}= await axios.get(`/api/products/${id}`)  //making request to the backend
        
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data  // loading the state with data 
        })

    }
    
    catch(error){
            dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message, //passing the error 
        })
    }
    
         
}

export const deleteProduct =(id) => async (dispatch,getState) => {
    try{
        dispatch({
            type:PRODUCT_DELETE_REQUEST

        })

        const {
            userLogin:{userInfo},
        } = getState()

        const config={
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`  //giving the token of the logged in user

            }
        }

        const {data} = await axios.delete(
            `/api/products/delete/${id}/`,
            config
        )
        dispatch({
            type:PRODUCT_DELETE_SUCCESS,
        })  



    }
    catch(error){
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:error.response && error.response.data.detail 
            ? error.response.data.detail
            :error.message, //passing the error 
        })
    }
}

export const createProduct =() => async (dispatch,getState) => {
    try{
        dispatch({
            type:PRODUCT_CREATE_REQUEST

        })

        const {
            userLogin:{userInfo},
        } = getState()

        // const csrftoken = getCookie('csrftoken');


        const config={
            headers:{
                'Content-type':'application/json',
                // 'X-CSRFToken': csrftoken,
                Authorization: `Bearer ${userInfo.token}`,  //giving the token of the logged in user

            }
        }

        const {data} = await axios.post(
            `/api/products/create/`,
            {},
            config
        )
        dispatch({
            type:PRODUCT_CREATE_SUCCESS,
            payload:data,
        }) 



    }
    catch(error){
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:error.response && error.response.data.detail 
            ? error.response.data.detail
            :error.message, //passing the error 
        })
    }
}

// function getCookie(name) {
//     const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//     return cookieValue ? cookieValue.pop() : '';
// }
