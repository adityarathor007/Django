import React,{useState,useEffect, useReducer} from 'react'
import {Link,useNavigate,useLocation, useParams} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails,updateUser} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import {USER_UPDATE_RESET,USER_DETAILS_RESET} from '../constants/userConstants'
import { listProductDetails,updateProduct } from '../actions/productActions'
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants'
import axios from 'axios'


function ProductEditScreen() {

    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [image,setImage]=useState('')
    const [brand,setBrand]=useState('')
    const [category,setCategory]=useState('')
    const [countInStock,setCountInStock]=useState(0)
    const [description,setDescription]=useState('')
    const [uploading,setUploading]=useState(false)

    const {id}=useParams()

    const location=useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()



    const productDetails = useSelector(state=>state.productDetails)
    const {error,loading,product} = productDetails


    // const userDetails = useSelector(state=>state.userDetails)
    // const {error:erroruser,loading:loadinguser,user} = userDetails

    const userDetails=useSelector(state=>state.loginUser)
    const {userInfo}=userDetails

    const productUpdate = useSelector(state=>state.productUpdate)
    const {error:errorUpdate,loading:loadingUpdate,success:successUpdate} = productUpdate

    
    useEffect(() => {
        
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        }
        else{
            if(!product.name || product._id !== Number(id)){
                dispatch(listProductDetails(id))
        }
            else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            
        }
        }


        
    },[dispatch,product,id,navigate])

    const submitHandler=(e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:id,
            name,
            price,
            image,
            brand,
            countInStock,
            category,
            description,

        },userInfo))
    }

    const uploadFileHandler = async (e) => {
        // console.log('File is uploading')
        const file=e.target.files[0]
        const formData=new FormData()

        formData.append('image',file)
        formData.append('product_id',id)
        setUploading(true)
        try{
            const config={
                header:{
                    'Content-Type':'multipart/form-data'


                }
            }
            const {data}=await axios.post('/api/products/upload/',formData,config)
            setImage(data)
            setUploading(false)
        }
        catch(error){
            setUploading(false)
        }
    }

  return (
    <div>
        <Link to='/admin/productlist'>
            Go Back
        </Link>
           <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}


        {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
        
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

            <Form.Group controlId='price' className='mb-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={(e)=>setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='mb-3'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter image'
                value={image}
                onChange={(e)=>setImage(e.target.value)}></Form.Control>
                
                <Form.Control
                type='file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
                ></Form.Control>
                {uploading && <Loader />}
                
            </Form.Group>
            
           


            <Form.Group controlId='brand' className='mb-3'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e)=>setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='stock' className='mb-3'>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                type='number'
                placeholder='Enter Stock'
                value={countInStock}
                onChange={(e)=>setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>




            <Form.Group controlId='category' className='mb-3'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e)=>setCategory(e.target.value)}></Form.Control>
            </Form.Group>


            <Form.Group controlId='description' className='mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}></Form.Control>
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

export default ProductEditScreen
