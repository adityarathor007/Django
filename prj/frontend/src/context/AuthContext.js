// created authContext so that we'll be able to import it into any of the file that is present in the source folder and we will be able to access the content data using the AuthContext tag created at the last


import {createContext, useState, useEffect} from 'react';
import jwt_decode from "jwt_decode";
import {useHistory} from 'react-router-dom';

const AuthContext=createContext()  //a stock to keep track of things happening in our application



export default AuthContext



export const AuthProvider=({children}) => {
    const [authTokens,setAuthToken]=useState(()=>{
    // for setting the refresh and access data in the local storage
        localStorage.getItem('authTokens')
         ? JSON.parse(localStorage.getItems('authTokens'))
         : null
    })

    const[user,setUser]=useState(()=>{
        //this is for setting user
        localStorage.getItem('authTokens')
        ? jwt_decode(localStorage.getItem('authTokens'))  //for decode the information stored in the token
        :null
    })

    const [loading,setLoading]  = useState(true)

    // to redirect to a page whenever it logs
    const history = useHistory()

    const loginUser = async (email,password) => {
        const response = await fetch("http://127.0.0.1:8000/api/token/",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,password
            })  // to convert js object to json 
        })

        const data=await response.json()

        console.log(data);

        if(response.status===200){
            console.log("Logged In");
            setAuthToken(data)  // remember whenver our data goes into setAuthToken then it gets stored in the local storage
            setUser(jwt_decode(data.access))  //decoding the access token and setting the Profile paratmeters in the local storage
            localStorage.setItem('authTokens',JSON.stringify(data))
            history.push("/")  // to push to the home page
        }
        else{
            console.log(response.status);
            console.log("there was server issue");
            alert("Something went wrong"+ response.status)
        }
    }


    const registerUser=async(email,username,password,password2) =>{
        const response=await fetch("http://127.0.0.1:8000/api/register/",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,username,password,password2
            })

        })
        if(response.status===201){
            history.push("/login")
        }
        else{
            console.log(response.status);
            console.log("there was a server issue");
            alert("something went wrong "+ response.status)   
        }

    }

    const logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.remove('authToken')
        history.push("/login")
    }

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthToken,
        registerUser,
        loginUser,
        logoutUser,
    }

    // whenever authToken refreshes we run the below one
    useEffect(() =>{
        if(authTokens){
            setUser(jwt_decode(authTokens.access))
        }

        setLoading(False)

    },[authTokens,loading])


    return (
        <AuthContext.Provider value={ContextData}>
            {loading?null:childer}
        </AuthContext.Provider>
   )

}
