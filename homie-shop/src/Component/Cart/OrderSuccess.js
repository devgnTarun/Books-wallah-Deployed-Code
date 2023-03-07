import React from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../Layout/MetaData'


const OrderSuccess = () => {
    //CSS AVAILABLE IN PAYEMENT.CSS
  return (
    <>
    <MetaData title='Order Placed'/>
        <div className="OrderSuccess">
        <i className="fa-solid fa-thumbs-up"></i>
            <h3>Order Placed</h3>
            <Link className='orderDone' to={'/me/orders'}>Your Orders</Link>
        </div>
    </>
  )
}

export default OrderSuccess