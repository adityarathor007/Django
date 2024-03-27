import React,{useState,useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import {Link, redirect,useNavigate,useLocation} from 'react-router-dom'

// import products from '../products'// static but now we will fetch from the backend

// import axios from 'axios'//using redux now

import {useDispatch,useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


function HomeScreen() {

  const dispatch = useDispatch()
  const productList=useSelector(state => state.productList)

  

  // destructuring it
  const {error,loading,products} = productList

  // const [products,setProducts] = useState([])
  const location=useLocation()
  let keyword=location.search
  console.log(keyword)

  useEffect(() =>{
    // console.log('Use Effect triggered')
      dispatch(listProducts(keyword))
    

  },[dispatch,keyword])

  


 

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? <Loader />
      :error? <Message variant='danger'>{error}</Message>
    :   
      <Row>
        {products.map(product=>(
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
        ))}
      </Row>
}
    </div>
  )
}

export default HomeScreen
