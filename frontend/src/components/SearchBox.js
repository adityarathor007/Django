import React,{useState} from 'react'
import {Button,Form} from 'react-bootstrap'
import {Link, redirect,useNavigate,useLocation} from 'react-router-dom'

function SearchBox() {

  const [keyword,setKeyword]=useState('')
  const navigate=useNavigate()

const submitHandler = (e) => {
  e.preventDefault();
  if(keyword){
    navigate(`/?keyword=${keyword}`)
  }
  else{
    const currentPath = window.location.pathname;
    navigate(currentPath)
  }
}

return (
  <Form onSubmit={submitHandler} className='d-flex' >
    <Form.Control
      type='text'
      name='q'
      onChange={(e) => setKeyword(e.target.value)}
      className='mr-2 ml-5 w-3'

    />
    <Button 
      type='submit'
      variant='success'
      className='p-2 mx-2'
    >
      Submit
    </Button>
  </Form>
);

}

export default SearchBox
