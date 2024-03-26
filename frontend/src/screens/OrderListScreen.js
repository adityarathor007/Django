import React,{useState,useEffect, useReducer} from 'react'
import {Link, redirect,useNavigate,useLocation} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listOrders} from '../actions/orderActions'            

export default function OrderListScreen() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    const orderList=useSelector(state=>state.orderList)
    const {loading,error,orders}=orderList
    const userLogin=useSelector(state=>state.userLogin)  //to check if the user is admin or not so we need details of it
    const {userInfo}=userLogin


    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){ //to make sure that if non admin user access this link then redirected to login page if nor logged in and if logged in then reception 
            dispatch(listOrders())
        }
        else{
            navigate('/login')
        }
    },[dispatch,navigate,userInfo])


    
  return (
    <div>
      <h1>Orders</h1>
      {loading 
      ?  <Loader />
      : error
      ?<Message variant='danger'>{error}</Message>
    :  (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
            <th>ID</th> 
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
            </tr>
            </thead>

            <tbody>
                {orders.map(order=>(
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>${order.totalPrice}</td>
                        
                        <td>{order.isPaid ?(
                            order.paidAt.substring(0,10)
                        )
                        :<i className='fas fa-check' style={{color:'red'}}></i>}
                        </td>

                        <td>{order.isDelivered ?(
                            order.deliveredAt.substring(0,10)
                        )
                        :<i className='fas fa-check' style={{color:'red'}}></i>}
                        </td>


                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button varaint='light' className='btn-sm'>
                                   Details
                                </Button>
                            </LinkContainer>

                        </td>
                    </tr>

                ))}
            </tbody>

            
        </Table>
    ) }
    </div>
  )}