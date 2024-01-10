// to access authcontext from AuthContext   

import axios from "axios"
import jwt_decode from "jwt-decode"
import dayjs from "dayjs"
import {useContext} from "react"
import AuthContext from "../context/AuthContext"


const baseURL="http://127.0.0.1:8000/api"

const useAxios = () => {
    const {authToken,setAuthTokens,setUser} = useContext(AuthContext)
    const axiosInstance = axios.create(
        {
            baseURL,
            headers:{Authorization: `Bearer ${authToken?.access}`}  //if the authToken is valid then you can get access to the information
        }
    ).access


    axiosInstance.interceptors.request.use( aync req => {
        const user= jwt_decode(authToken)
        const isExpired= dayjs.unix(user.exp).diff(dayjs()) <1  //to check if the access token hasnt expired

        if (isExpired) return req 

        const response = await.axios.post(`${baseURL}/token/refresh/`,{
            refresh:authToken.refresh

        })
        localStorage.setItem("authToken",JSON.stringify(response.data))
        // localStorage.setItem("authToken",JSON.stringify(response.data))

        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))

        req.header.Authorization=`Bearer ${response.data.access}`

        return req


    })

    return axiosInstance
}

export default useAxios
