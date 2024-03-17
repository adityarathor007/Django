import React,{useState,useEffect, useReducer} from 'react'
import {useNavigate,Link,useParams} from 'react-router-dom'
import {Button,Row,Col,ListGroup,Image,Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails} from '../actions/orderActions'



function OrderScreen() {
  const {id} = useParams()
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const orderDetails=useSelector(state=>state.orderDetails)
  const {order,error,loading}=orderDetails



  useEffect(()=>{
    if(!order || order._id!==Number(id)){
    dispatch(getOrderDetails(id))
    }
    
  },[order,id])

  if(!loading && !error){
      order.itemsPrice=order.orderItems.reduce((acc,item)=>acc+item.price*item.qty,0).toFixed(2)
  }

  
return loading? (
    <Loader />
    ): error ? (
    <Message variant='danger'>{error}</Message>)
    :(
    <div>
    <h1>Order Tracking</h1>
    <h5>Order id: {order._id}</h5>
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p><strong>Name: </strong>{order.user.name}</p>
                    <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                    <p>
                        <strong>Shipping: </strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}
                        {' '}
                        {order.shippingAddress.postalCode},
                        {' '}
                        {order.shippingAddress.country},

                    </p>

                     {order.isDelivered? (
                        <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                    ):
                    (
                        <Message variant='warning'>Not Delivered</Message>
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}

                    </p>

                    {order.isPaid? (
                        <Message variant='success'>Paid on {order.paidAt}</Message>
                    ):
                    (
                        <Message variant='warning'>Not Paid</Message>
                    )}

                </ListGroup.Item>


                <ListGroup.Item>
                    <h2>Ordered Items</h2>
                    {order.orderItems.length===0 ? <Message variant='info'>Order is empty</Message> 
                    
                    :(
                    <ListGroup variant='flush'>
                        {order.orderItems.map((item,index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col>
                                        {item.qty}*${item.price}=${(item.qty*item.price).toFixed(2)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    )
                    }
                </ListGroup.Item>
            </ListGroup>
            </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items:</Col>
                            <Col>${order.itemsPrice}</Col>
                        </Row>
                            
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>${order.shippingPrice}</Col>
                        </Row>
                            
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>
                            
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col className='fs-4'>Total:</Col>
                            <Col className='fs-4'>${order.totalPrice}</Col>
                        </Row>
                            
                    </ListGroup.Item>

                    
                </ListGroup>
            </Card>
            </Col>
        
      </Row>
    </div>
  )
}

export default OrderScreen