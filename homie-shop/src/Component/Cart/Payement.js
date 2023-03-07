import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import MetaData from '../Layout/MetaData'
import CheckOurSteps from './CheckOurSteps'
import {CardNumberElement , useStripe , CardCvcElement , CardExpiryElement , useElements} from "@stripe/react-stripe-js";
import axios from "axios"
import './payement.css'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { clearError, newOrders } from '../../Actions/orderAction';

const Payement = () => {
    const history = useHistory();
    const stripe = useStripe();
    const dispatch = useDispatch();
    const element = useElements();
    const paybtn = useRef(null)

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const {shippingInfo , cartItem } = useSelector((state) => state.cart)  
    const {user} = useSelector((state) => state.user)  
    const {error } = useSelector((state) => state.newOrder) 


     //Creating order 
     const order = {
        shippingInfo,
        orderItem : cartItem,
        itemPrice : orderInfo.subTotal,
        taxPrice : orderInfo.tax,
        shippingPrice : orderInfo.shippingCharges,
        totalPrice : orderInfo.totalPrice,
    }

    //Payemnt data relating amount
    const payementData = {
        amount : Math.round(orderInfo.totalPrice * 100)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        paybtn.current.disabled = true;

        try {
            const config = {
                headers : {
                    "Content-Type" : "application/json"
                }
            }
        const {data} = await axios.post("/api/v1/payement/process" , payementData , config);
        const client_secret = data.client_secret;


        if(!stripe || !element) return;

        const result = await stripe.confirmCardPayment(client_secret , {
            payment_method : {
                card : element.getElement(CardNumberElement), 
                billing_details : {
                name : user.name,
                email : user.email,
                address :{
                    line1 :shippingInfo.address,
                    city : shippingInfo.city,
                    state : shippingInfo.state,
                    postal_code : shippingInfo.pinCode,
                    country : shippingInfo.country,
                }
            }
        },
        })

        if(result.error) {
            paybtn.current.disabled = false;
            toast.error(result.error.message, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        else {
            if(result.paymentIntent.status === "succeeded"){
                //Adding payement info here becuase opr prnhi hai stripe ke through mil jata hai
                order.payementInfo = {
                    id : result.paymentIntent.id,
                    status : result.paymentIntent.status,
                }
                dispatch(newOrders(order));
                history.push('/success')
            }
            else {
                toast.error("There is some error white processing payement", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
        }
            
        } catch (error) {
            paybtn.current.disabled = false;
            toast.error(error.message, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }
    // Booking order 
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
        
    }, [dispatch  , error , toast])

   
    
  return (
    <>
        <MetaData title={"Processing Payement"}/>
        <ToastContainer/>
        <div className="payement_page">
        <CheckOurSteps activeStep={2}/>
        <form action="" className='payement_form' onSubmit={(e) => handleSubmit(e)}>
            <h3>Card Info</h3>
            <div className='payementInput_div'>
                <i class="far fa-credit-card"></i>
                <CardNumberElement className='payementInput'/>
            </div>
            <div className='payementInput_div'>
            <i class="fas fa-calendar-minus"></i>
                <CardExpiryElement className='payementInput'/>
            </div>
            <div className='payementInput_div'>
            <i class="fas fa-key"></i>
                <CardCvcElement className='payementInput'/>
            </div>
            
            <button type='submit' ref={paybtn} className='payementBtn'> Pay - &#8377; {orderInfo &&  orderInfo.totalPrice}</button>
        </form>

        </div>

        
        
    </>
  )
}

export default Payement