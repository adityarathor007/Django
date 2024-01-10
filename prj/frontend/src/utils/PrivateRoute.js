import {Route,Redirect} from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'


const PrivateRoute=({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return (
    <Route{...rest}>
        {!user ? <Redirect to ='/login' /> : children}
    </Route>   //so if there is a user it will return all prop of that account or else it will redirect to the login page
    )
}


export default PrivateRoute



    
  


