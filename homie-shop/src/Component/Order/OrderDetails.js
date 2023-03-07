import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Layout/Loader/Loader';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { clearError, orderDetailsAction } from '../../Actions/orderAction';
import { Link, useRouteMatch } from 'react-router-dom';
import MetaData from '../Layout/MetaData';


// css in order . css 
const OrderDetails = () => {

    const dispatch = useDispatch()
    const {error , loading , order} = useSelector(state => state.orderDetails)


    const match = useRouteMatch();

    useEffect(() => {
        if(error) {
            toast.error(error, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
              dispatch(clearError())
          }
          dispatch(orderDetailsAction(match.params.id))
    }, [dispatch , error , toast , match.params.id])
    

  return (
    <>
        <MetaData title={'Order Details'}/>
        <ToastContainer/>
        {
            loading ? <Loader/> : 
            <div className="orderDetailsPage">
                <h3>Order Details</h3>
                <div className="orderDetailBox">


                    <div className="orderDetail_shipping">
                    <h3>Shipping Information</h3>
                    <div>
                        <p>Name : <span>{ order.user &&  order.user.name} </span></p>
                        <p>Email : <span>{ order.user &&  order.user.email}</span></p>
                        <p>Phone Number : <span>{ order.shippingInfo &&  order.shippingInfo.phoneNo}</span></p>
                        <p>Address : <span>{ order.shippingInfo &&  order.shippingInfo.address} , { order.shippingInfo &&  order.shippingInfo.city}</span></p>
                    </div>
                    </div>

                    <div className="orderDetail_payement ">
                    <h3>Payement Information</h3>
                    <div>
                        <p className={`${ order.payement && order.payement.status === 'succeeded' ? 'greenColor' : "redColor"}`}>Payement Status : <span>{ order.payement && order.payement.status === 'succeeded' ? 'Paid' : "Not Paid"} </span></p>
                        <p>Items Price : <span>{ order.itemPrice &&  order.itemPrice} </span></p>  
                        <p>Total Invoice Price : <span>{ order.totalPrice &&  order.totalPrice}</span></p>
                        <p className={`${ order.orderStatus && order.orderStatus === 'Delivered' ? 'greenColor' : "redColor"}`}>Order Status : <span>{ order.orderStatus &&  order.orderStatus} </span></p>
                    </div>
                    </div>

                    <div className="orderedItem ">
                    <h3>Ordered Item</h3>
                    <div className='confirm_cart_items'> 
                    {
                                    order.orderItem && order.orderItem .map((i) => 
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
            </div>
        }
    </>
  )
}

export default OrderDetails