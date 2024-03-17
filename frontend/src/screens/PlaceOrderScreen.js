import React,{useState,useEffect, useReducer} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {Button,Row,Col,ListGroup,Image,Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../actions/cartActions'



function PlaceOrderScreen() {
  const cart=useSelector(state=>state.cart)
  const placeOrder=()=>{
    console.log('place order')
  }
  cart.itemsPrice=cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0).toFixed(2)
  cart.shippingPrice=(cart.itemsPrice>100? 0: 10).toFixed(2)
  cart.TaxPrice=((0.082)*cart.itemsPrice).toFixed(2)
  cart.totalPrice=(Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.TaxPrice)).toFixed(2)
return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Shipping: </strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}
                        {' '}
                        {cart.shippingAddress.postalCode},
                        {' '}
                        {cart.shippingAddress.country},

                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method: </strong>
                        {cart.paymentMethod}

                    </p>
                </ListGroup.Item>


                <ListGroup.Item>
                    <h2>Ordered Items</h2>
                    {cart.cartItems.length===0 ? <Message variant='info'>your cart is empty</Message> 
                    
                    :(
                    <ListGroup variant='flush'>
                        {cart.cartItems.map((item,index) => (
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
                            <Col>${cart.itemsPrice}</Col>
                        </Row>
                            
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>${cart.shippingPrice}</Col>
                        </Row>
                            
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>${cart.TaxPrice}</Col>
                        </Row>
                            
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col className='fs-4'>Total:</Col>
                            <Col className='fs-4'>${cart.totalPrice}</Col>
                        </Row>
                            
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='button-container'>
                        <Button
                        type='button'
                        className='btn-block btn float-right'
                        disabled={cart.cartItems===0}
                        onClick={placeOrder}
                         >
                            Place Order
                        </Button>
                        </div>
                            
                    </ListGroup.Item>
                    
                </ListGroup>
            </Card>
            </Col>
        
      </Row>
    </div>
  )
}

export default PlaceOrderScreen
