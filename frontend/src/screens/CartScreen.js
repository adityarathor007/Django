import {useEffect} from 'react'
import {Link,useParams,useLocation,useNavigate} from 'react-router-dom'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import Message from '../components/Message'
import {useDispatch,useSelector} from 'react-redux'
import {addToCart,removeFromCart} from '../actions/cartActions'

function CartScreen() {
  const { id } = useParams(); 
  const location=useLocation();
  const productID=id
  const qty=location.search?Number(location.search.split('=')[1]) : 1
  // console.log('qty:',qty)
  
  const dispatch =useDispatch()

  const cart = useSelector(state=>state.cart)
  const {cartItems}=cart  
  // console.log('cartItems:',cartItems)

  const navigate=useNavigate()
  useEffect(() =>{
    if(productID){
      dispatch(addToCart(productID,qty))
    }
  },[productID,qty])

  const removeFromCartHandler=(id) => {
    // console.log('remove:',id)
    dispatch(removeFromCart(id))
  }

 

  const checkoutHandler=()=>{
    // navigate('/login?redirect=shipping')
    navigate('/shipping')
  }



  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length===0?(
          <Message variant='info'>
            Your cart is empty. <Link to='/'>Continue Shopping</Link>
          </Message>
        ):
        <ListGroup variant='flush'>
          {cartItems.map(item=>(
          <ListGroup.Item key={item.product}>
            <Row>
              <Col md={2}>
                <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
              <Col md={3}>
                <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>{item.name}</Link>
                </Col>
                <Col md={2}>
                  ${item.price}
                </Col>
                <Col md={3}>
                              <Form.Control
                                    as='select'
                                    value={item.qty}
                                     onChange={(e) => dispatch(addToCart(item.product,e.target.value))}
                                      style={{ color: 'black' }}  > 
                                     {
                                     [...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x+1} value={x+1}>
                                            {x+1}
                                        </option>
                                     )
                                     )}
                            </Form.Control>
                </Col>
           <Col md={1}>
            <Button
            type='button'
            variant='light'
            onClick={() => removeFromCartHandler(item.product)}
            >
            <i className='fa fa-trash' />
            </Button>
           </Col>
            
            </Row>
          </ListGroup.Item>
          ))}
          
          </ListGroup>}
      </Col>
      <Col>
      <Card>
        <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc,item)=>acc+item.qty,0)})</h2>
              ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
            </ListGroup.Item>
        </ListGroup>
        <ListGroup.Item>
          <Button
          type='button'
          className='btn full-width-btn'
          disabled={cartItems.length===0}
          onClick={checkoutHandler}
          >
            Proceed To checkout
          </Button>
        </ListGroup.Item>
      </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
