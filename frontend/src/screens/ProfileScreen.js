import React,{useState,useEffect, useReducer} from 'react'
import {Link, redirect,useNavigate,useLocation} from 'react-router-dom'
import {Form,Button,Row,Col,Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails,updateUserProfile} from '../actions/userActions'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
import {listMyOrder} from '../actions/orderActions'


function ProfileScreen() {
    
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
        // console.log('Updating....')
        dispatch(updateUserProfile({
            'id':user._id,
            'name':name,
            'email':email,
            'password':password
        }))
            setMessage('')
        }
        
    }


    const userDetails = useSelector(state=>state.userDetails)
    const {error,loading,user} = userDetails

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin //the person who logged in

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading:loadingOrders,error:errorOrders,orders} = orderListMy


    useEffect(() => {
        if(!userInfo){
            navigate('/login')  //if the user is not logged in and tries to access this pg then redirect to login page
        }
        else{
            if(!user || !user.name || success || userInfo._id !== user._id ){  //to check whether the user information has been loaded or not
                dispatch({ type:USER_UPDATE_PROFILE_RESET})
                console.log('Fetching user details...');
                dispatch(getUserDetails('profile'))  //sending profile as parameter to complete the url for making get request(api/users/profile)
                dispatch(listMyOrder())
            }
            else{ 
                console.log('User details already loaded.');
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,userInfo,user,navigate])




  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
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
           
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            
            <Form.Group controlId='password' className='mb-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
           
                type='password'
                placeholder='Confirm Password'
                value={confirmpassword}
                onChange={(e)=>setconfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>




            <Button type='submit' variant='primary'>
                Update
            </Button>

        </Form>

      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? <Loader />
        :errorOrders?(
            <Message variant='danger'>{errorOrders}</Message>
        ):(
            <Table className='table-info' responsive striped hover >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid?order.paidAt.substring(0,10):(
                                <i className='fas fa-times' style={{color:'red'}}></i>)}
                                </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button className='btn-sm'>Details</Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
