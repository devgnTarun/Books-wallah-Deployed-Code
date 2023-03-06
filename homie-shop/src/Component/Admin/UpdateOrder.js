import React , {useEffect , useState} from 'react'
import { useSelector  , useDispatch} from 'react-redux'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { clearError, orderDetailsAction, updateOrderAction } from '../../Actions/orderAction';
import MetaData from '../Layout/MetaData'
import Slider from './Slider';
import { ToastContainer, toast } from "react-toastify";
import Loader from '../Layout/Loader/Loader'
import { UPDATE_ORDER_RESET } from '../../Constants/orderConstant';



const UpdateOrder = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    const {error , loading , order} = useSelector(state => state.orderDetails)
    const {error : isError , isUpdated} = useSelector(state => state.delOrder)
    const [status, setStatus] = useState('')

    const orderId  = match.params.id

    const submitHandler = (e) => {
        e.preventDefault() ;
        let myForm = new FormData() ;
        myForm.set('status' , status)

        dispatch(updateOrderAction(orderId , myForm))
    }

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
        if(isError) {
            toast.error(isError, {
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
        if(isUpdated) {
            toast.success('Order Updated Succesfully', {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
              history.push('/admin/orders')
              dispatch({type : UPDATE_ORDER_RESET})
          }
          dispatch(orderDetailsAction(match.params.id))
    }, [dispatch , error , toast , match.params.id , isUpdated , isError])


  return (
    <>
    <MetaData title={'Create Product'}/>
    <div className="dashboard">
        <Slider/>

        <div className="create_product_page">
        {loading ? <Loader/> :    <div className="confirm_page">

<div className="confirm_box">

    <div className="confirm_details">
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

            {/* Cart item confrim  */}

            <div className="confirm_Cart">
                <h3>Order Items</h3>
                <div className="confirm_cart_items">
                    {
                        order.orderItem && order.orderItem.map((i) => 
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

    <div style={{display : order.orderStatus === 'Delivered' ? 'none' : 'block'}} className="confirm_summary">
    <form action="" className='create_product_form' encType='multipart/form-data' onSubmit={submitHandler}>
                        <h3>Update Order</h3>
                    
                        <div>
                            <label htmlFor="category">Status</label>
                            <select required onClick={(e) => setStatus(e.target.value)} >
                                <option value="">Select Category</option>
                               { order.orderStatus === 'Processing' ? <option value="Shipped">Shipped</option> : ''}
                               { order.orderStatus === 'Shipped' ?  <option value="Delivered">Delivered</option> : ''}
                            </select>
                        </div>
        


                        <button id='create_pruduct_button' type='submit' disabled={loading ? true : false || status === '' ? true : false}>Update</button>


                    </form>
    </div>
</div>
</div> }   
      

        </div>
    </div>
</>
  )
}

export default UpdateOrder