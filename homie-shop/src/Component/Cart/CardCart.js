import ReactStars from "react-rating-stars-component";
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../Actions/cartAction";
import Loader from "../Layout/Loader/Loader";



const CardCart = ({item}) => {
   
  const { product , loading } = useSelector(
    (state) => state.productDetail
  );
  const dispatch = useDispatch()
  
    const increaseQty = (id , quantity, stock) => {
        const newQty = quantity + 1;
        if(stock <= quantity) {
          return;
        }
        dispatch(addToCart(id, newQty))
    }

    const decreaseQty = (id , quantity) => {
        const newQty = quantity - 1;
        if(1 >= quantity) {
          return;
        }
        dispatch(addToCart(id, newQty))
    }

    const deleteFromCart = (id) => {
      dispatch(removeFromCart(id))
    }

  const options = {
    edit: false,
    color: "rgb(247, 206, 129)",
    activeColor: "orange",
    size: window.innerWidth < 600 ? 15 : 20,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <>
      {loading ? <Loader/> :   <div className='itemCard' key={item.product}>

<div className="card_Info">
    <div className="card_image">
    <img src={item.image} alt="" />
    </div>
    <div className="card_text">
    <h2>{item.name}</h2>
    <p className={`${item.stock >= 1 ? 'greenColor' : 'redColor'}`}> {item.stock >= 1 ? "In Stock" : "Out of Stock"} </p>
    <h5>&#8377;{item.price}</h5>
    <div>
    <ReactStars {...options} />
    </div>
       
    </div>   
</div>

<div className="card_price">
    <h3>Total : <span>&#8377;{item.price * item.quantity}</span></h3>
   
</div>
<div className="card_stock">

<div className="quantity_container">
          <button style={{borderTopLeftRadius : '5px' , borderBottomLeftRadius : '5px'}} onClick={() => decreaseQty(item.product , item.quantity)}>-</button>
          <input readOnly type="tel" value={item.quantity} />
          <button style={{borderTopRightRadius : '5px' , borderBottomRightRadius : '5px'}}  onClick={()=> increaseQty(item.product , item.quantity , item.stock)}>+</button>
        </div>
        <p onClick={() => deleteFromCart(item.product)} className="redColor extrass">Remove</p>
</div>
</div>}
    </>
  )
}

export default CardCart