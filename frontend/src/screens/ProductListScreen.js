import React,{useState,useEffect, useReducer} from 'react'
import {Link, redirect,useNavigate,useLocation} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button,Row,Col, Container} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {deleteProduct, listProducts,createProduct} from '../actions/productActions'          
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'  

export default function ProductListScreen() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    const productList=useSelector(state=>state.productList)
    const {loading,error,products,page,pages}=productList

    const productDelete=useSelector(state=>state.productDelete)
    const {loading:loadingDelete,error:errorDelete,success:successDelete}=productDelete

    const userLogin=useSelector(state=>state.userLogin)  //to check if the user is admin or not so we need details of it
    const {userInfo}=userLogin

    const productCreate=useSelector(state=>state.productCreate)
    const {loading:loadingCreate,error:errorCreate,success:successCreate,product}=productCreate

    const location = useLocation()
    let keywords = location.search
    console.log(keywords)
    // const keyword = searchParams.get('keyword');

    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){ //to make sure that if non admin user access this link then redirected to login page if nor logged in and if logged in then reception 
            navigate('/login')  
        }

        if(successCreate){
            navigate(`/admin/product/${product._id}/edit`)
        }
        else{
            dispatch(listProducts(keywords))
        }
       
    },[dispatch,navigate,userInfo,successDelete,keywords,successCreate,product])

    const deleteHandler=(id) => {
        // console.log('DELETE:',id)
        if(window.confirm('Are you sure you want to delete the user?')){  //to add confirmation
            dispatch(deleteProduct(id))

        }}

    const createProductHandler=() => {
        dispatch(createProduct())
        //create Product
    }


  return (
    <div>
      <Row className='align-items-center'>
    <Col md={10}>
        <h1>Products</h1>
    </Col>
    <Col md={2} >
        <Button  className='my-3 ' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
        </Button>
    </Col>
</Row>
{loadingDelete && <Loader/>}
{errorDelete && <Message variant='danger'>{errorDelete}</Message>}

{loadingCreate && <Loader/>}
{errorCreate && <Message variant='danger'>{errorCreate}</Message>}


      {loading 
      ?  <Loader />
      : error
      ?<Message variant='danger'>{error}</Message>
    :  (
        <div>
        <Table striped bordered hover responsive >
            <thead>
                <tr>
            <th>ID</th> 
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
            </tr>
            </thead>

            <tbody>
                {products.map(product=>(
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        
                        <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                <Button varaint='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                   
                                </Button>
                            </LinkContainer>

                            <Button varaint='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                
                                </Button>
                        </td>
                    </tr>
    
                ))}
            </tbody>

            
        </Table>
        <Paginate pages={pages} page={page} isAdmin={true} /> 
        </div>




    ) }
    </div>
  )
}
