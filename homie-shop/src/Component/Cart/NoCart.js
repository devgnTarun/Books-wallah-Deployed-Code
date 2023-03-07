import React from 'react'
import { Link } from 'react-router-dom'

const NoCart = () => {
  return (
    <div className='noProducts cart_empty'>

        <i class="fas fa-cart-arrow-down"></i>
        <h3>No Product available in Cart</h3>
        <Link to='/products' className='empty_btn'>Continue Shopping</Link>
        </div>
  )
}

export default NoCart