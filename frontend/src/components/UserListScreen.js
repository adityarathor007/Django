import React,{useState,useEffect, useReducer} from 'react'
import {Link, redirect,useNavigate,useLocation} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listUsers,deleteUser} from '../actions/userActions'            

export default function UserListScreen() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    const userList=useSelector(state=>state.userList)
    const {loading,error,users}=userList
    const userLogin=useSelector(state=>state.userLogin)  //to check if the user is admin or not so we need details of it
    const {userInfo}=userLogin
    const userDelete=useSelector(state=>state.userDelete)
    const {success:successDelete}=userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){ //to make sure that if non admin user access this link then redirected to login page if nor logged in and if logged in then reception 
            dispatch(listUsers())
        }
        else{
            navigate('/login')
        }
    },[dispatch,navigate,userDelete])

    const deleteHandler=(id) => {
        // console.log('DELETE:',id)
        if(window.confirm('Are you sure you want to delete the user?')){  //to add confirmation
            dispatch(deleteUser(id))
        }
        

    }
  return (
    <div>
      <h1>Users</h1>
      {loading 
      ?  <Loader />
      : error
      ?<Message variant='danger'>{error}</Message>
    :  (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
            <th>ID</th> 
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
            </tr>
            </thead>

            <tbody>
                {users.map(user=>(
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.email}</td>
                        <td>{user.name}</td>
                        <td>{user.isAdmin ?(
                            <i className='fas fa-check' style={{color:'green'}}></i>
                        )
                        :<i className='fas fa-check' style={{color:'red'}}></i>}
                        </td>
                        {/* to take from list page to that user profile */}
                        <td>
                            <LinkContainer to={`/admin/user/${user._id}`}>
                                <Button varaint='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                   
                                </Button>
                            </LinkContainer>

                            <Button varaint='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                    <i className='fas fa-trash'></i>
                
                                </Button>
                        </td>
                    </tr>

                ))}
            </tbody>

            
        </Table>
    ) }
    </div>
  )
}
