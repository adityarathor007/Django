import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

function CheckoutSteps({step1,step2,step3,step4}) {
  return (

      <Nav className='justify-content-center mb-3'>
        <Nav.Item className='ms-4'>
            {step1?(
                <LinkContainer to='/login'>
                <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            ):
            (
                <Nav.Linkdisabled>Login</Nav.Linkdisabled>
            )

            }
            
        </Nav.Item>

        <Nav.Item className='ms-4'>
            {step2?(
                <LinkContainer to='/shipping'>
                <Nav.Link>Shipping</Nav.Link>
            </LinkContainer>
            ):
            (
                <Nav.Link disabled>Shipping</Nav.Link>
            )

            }
            
        </Nav.Item>

        <Nav.Item className='ms-4'>
            {step3?(
                <LinkContainer to='/payment'>
                <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
            ):
            (
                <Nav.Link disabled>Payment</Nav.Link>
            )

            }
            
        </Nav.Item>

        <Nav.Item className='ms-4'>
            {step4?(
                <LinkContainer to='/login'>
                <Nav.Link>Place_Order</Nav.Link>
            </LinkContainer>
            ):
            (
                <Nav.Link disabled>Place_Order</Nav.Link>
            )

            }
            
        </Nav.Item>

      </Nav>

  )
}

export default CheckoutSteps
