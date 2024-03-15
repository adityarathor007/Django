import React,{useState,useEffect, useReducer} from 'react'
import {Link, redirect,useNavigate,useLocation} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'



function RegisterScreen() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpassword,setconfirmPassword] = useState('')
    const [message,setMessage] = useState('')

    const location=useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        if (password != confirmpassword){
            setMessage('password do not match')
        }
        else{
        dispatch(register(name,email,password))
        }
        
    }

    const redirect=location.search?location.search.split('=')[1] : '/'

    const userRegister = useSelector(state=>state.userRegister)

    const {error,loading,userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            navigate(redirect)

        }
    },[userInfo,redirect,navigate])


  return (
    <FormContainer>
        <h1>SignIn</h1>
        {message && <Message variant='danger'>{message}</Message>}  {/*when password dont match then only this message comes */}
        
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader></Loader>}


        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='mb-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                required
                type='name'
                placeholder='Enter Email'
                value={name}
                onChange={(e)=>setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='mb-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                required
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>





            <Form.Group controlId='password' className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                required
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            
            <Form.Group controlId='password' className='mb-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                required
                type='password'
                placeholder='Confirm Password'
                value={confirmpassword}
                onChange={(e)=>setconfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>




            <Button type='submit' variant='primary'>
                SignIn
            </Button>

        </Form>

        <Row className='py-3'>
            <Col>
            Have an account ? <Link to={redirect? `/login?redirect=${redirect}` : '/login' }>SignIn</Link>
            </Col>
        </Row>
    </FormContainer>
    
  )
}

export default RegisterScreen
