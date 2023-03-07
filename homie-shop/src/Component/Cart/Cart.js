import React from 'react'
import './cart.css'
import CardCart from './CardCart'
import {  useSelector } from 'react-redux'
import NoCart from './NoCart'
import { Link } from 'react-router-dom'
import MetaData from '../Layout/MetaData'


const Cart = () => {

  // const dispatch = useDispatch()

  const {cartItem } = useSelector((state) => state.cart)



  return (
    <>
    <MetaData title={'Your Cart'}/> 
      {
        cartItem.length === 0 ? <NoCart/> : 
        <div className="cartSection">
        <h1  className="main-heading cart_head">My Cart</h1>
          
        <div className="cartBox">
        <div className="itemCart">
        {
        cartItem && cartItem.map((item) => 
         
         
              <CardCart item={item}/>    
        
         )
        }
          </div> 
          

          <div className="sub_total">
                <div className="total_cart">
                    <h3 >  Total Invoice Price : <span  aria-readonly>
                    &#8377; {`${cartItem.reduce(
                      (acc, item) => acc + item.quantity  * item.price ,  0
                    )}`}
                      </span></h3>
                </div>
                <div className="button_cart"> 
                    <Link className='cartBtn_new' to={'/product'}>Continue Shopping</Link>
                    <Link className='cartBtn_new' to={'/login?redirect=shipping'}>Buy</Link>
                </div>
          </div>


          </div>


      </div>
      }
    </>
  )
}

export default Cart