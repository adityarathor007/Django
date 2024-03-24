import React,{useState,useEffect, useReducer} from 'react'
import {Link,useNavigate,useLocation, useParams} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails} from '../actions/userActions'
import FormContainer from '../components/FormContainer'



function EditUserScreen() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin,setAdmin]=useState(false)
    const {id}=useParams()

    const location=useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()



    const userDetails = useSelector(state=>state.userDetails)
    const {error,loading,user} = userDetails
    
    useEffect(() => {
        console.log(user)
        if(!user || user._id !== Number(id)){
            dispatch(getUserDetails(id))
        }
        else{
            setName(user.name)
            setEmail(user.email)
            setAdmin(user.isAdmin)
        }
    },[user,id])

    const submitHandler=(e) => {
        e.preventDefault()
    }


  return (
    <div>
        <Link to='/admin/userlist'>
            Go Back
        </Link>
           <FormContainer>
        <h1>Edit User</h1>
        
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='mb-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='name'
                placeholder='Enter Email'
                value={name}
                onChange={(e)=>setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='mb-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>





            <Form.Group controlId='isadmin' className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Check
                type='checkbox'
                placeholder='Is Admin'
                checked={isAdmin}
                onChange={(e)=>setAdmin(e.target.check)}></Form.Check>
            </Form.Group>

         




            <Button type='submit' variant='primary'>
                Update
            </Button>

        </Form>
        )}


        

    
    </FormContainer>
    </div>
 
    
  )
}

export default EditUserScreen
