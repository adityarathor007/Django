import React,{useState,useEffect} from 'react'
import {Link,useParams,useNavigate} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Button,Card,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import products from '../products' //using data from the backend
// import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {listProductDetails} from '../actions/productActions'









function ProductScreen() {
    const navigate=useNavigate() ;
    const [qty,setQty]=useState(1) ;
    const { id } = useParams(); 
    // const product=products.find((p) => String(p._id) === id);  //using parameter of the link passed
    // const [product,setProduct]=useState([])
    const dispatch=useDispatch()
    const productDetails=useSelector(state => state.productDetails)

    // destructuring 
    const {loading,error,product}=productDetails
    
    const handleQtyChange = (e) => {
        setQty(e.target.value);
    };

    useEffect(()=>{
        dispatch(listProductDetails(id))
    },[dispatch])

    const addToCartHandler=()=>{
        navigate(`/cart/${id}?qty=${qty}`)
    }
 


    return (
    <div>
      <Link to='/' className='btn btn-outline-info btn-rounded text-white my-3'   data-mdb-ripple-color="dark">Go Back</Link>
      {loading ? <Loader />
      :error? <Message variant='danger'>{error}</Message>
    : (
         <Row> 
        <Col md={6}>    
            <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item> zxad=. 
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} ratings`} color={'#f8e825'} />
                </ListGroup.Item>
                <ListGroup.Item>
                    Price:${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Description:{product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col>
                                <strong>{product.price}</strong>
                            </Col>
                        </Row>    
                    </ListGroup.Item>    
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                                <strong>{product.countInStock>0?'In Stock':'Out of Stock'}</strong>
                            </Col>
                        </Row>    
                    </ListGroup.Item>

                    {product.countInStock>0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>Qty</Col>
                                <Col xs='auto' className='my-1'>
                                <Form.Control
                                    as='select'
                                    value={qty}
                                     onChange={handleQtyChange}
                                      style={{ color: 'black' }}  > 
                                     {
                                     [...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x+1} value={x+1}>
                                            {x+1}
                                        </option>
                                     )
                                     )}
                            </Form.Control></Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                        <Button onClick={addToCartHandler} className='btn mx-4' disabled={product.countInStock === 0} type='button' >Add to cart</Button>
                    </ListGroup.Item>       
                </ListGroup>    
            </Card>    
        </Col>
      </Row>
    )
}
     
    </div>
  )
}

export default ProductScreen
