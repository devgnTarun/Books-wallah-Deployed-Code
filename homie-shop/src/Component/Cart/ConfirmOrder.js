import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import MetaData from '../Layout/MetaData'
import CheckOurSteps from './CheckOurSteps'
import './confirmOrder.css'

const ConfirmOrder = () => {
    const history = useHistory();
    const {shippingInfo , cartItem} = useSelector(state => state.cart)
    const {user} = useSelector(state => state.user)

    const subTotal = cartItem.reduce(
        (acc , i ) => acc + i.quantity * i.price, 0
    )
    
    const shippingCharges = subTotal > 2000 ? 0 : 40;

    const tax = subTotal * 0.18;

    const totalPrice = subTotal + shippingCharges + tax;

    const address = `${shippingInfo.address} , ${shippingInfo.city}  , ${shippingInfo.state} , ${shippingInfo.pinCode}, ${shippingInfo.country} `

    const proceedToPayement = () => {
        const data = {
            subTotal , tax , totalPrice , shippingCharges
        }
        sessionStorage.setItem("orderInfo" , JSON.stringify(data))
        history.push('/processing/payement')
    }


  return (
    <>
        <MetaData title={'Confirm Order'}/>

        <div className="confirm_page">
        <CheckOurSteps activeStep={1}/> 

            <div className="confirm_box">

                <div className="confirm_details">
                        <div id="shipping_confirm">
                        <h3>Shipping Info</h3>
                            <div>
                                <p>Name : <span> {user.name} </span> </p> 
                                <p>Phone No :  <span> {shippingInfo.phoneNo} </span></p> 
                                <p>Address  :  <span> {address} </span></p> 
                            </div>
                        </div>

                        {/* Cart item confrim  */}

                        <div className="confirm_Cart">
                            <h3>Your Cart Items</h3>
                            <div className="confirm_cart_items">
                                {
                                    cartItem && cartItem.map((i) => 
                                        <>
                                            <div key={i.product}>
                                                <Link className='image_div_confrim'>
                                                <img src={i.image} alt="" />
                                                </Link>
                                                <Link  className='confirm_cart_name' to={`/product/${i.product}`}>{i.name}</Link>
                                            <span>
                                                {i.price} X {i.quantity} : <b>  &#8377; {i.price * i.quantity}</b>
                                             </span>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                </div>

                <div className="confirm_summary">
                        <h3>Order Summary</h3>
                        <div className='summary_details'>
                            <p>Sub Total : <span>  &#8377; {subTotal} </span></p>
                            <p>Shipping Charges : <span> &#8377; {shippingCharges}</span></p>
                            <p>GST (18%) : <span> &#8377; {tax} </span></p>
                        </div>
                        <div className="summary_confirm">
                                <p>Total : <b> &#8377; {totalPrice}</b></p>

                                <button className='proceedPayement' onClick={proceedToPayement}>Proceed to Payement</button>
                        </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default ConfirmOrder