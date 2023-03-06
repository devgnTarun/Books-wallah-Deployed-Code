import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProductDetails, newReviewAction } from "../../../Actions/productAction";
import { useParams, useRouteMatch } from "react-router-dom";
import "./productDetail.css";
import{Carousel}from"react-responsive-carousel";
import"react-responsive-carousel/lib/styles/carousel.min.css";
import CardReview from "./CardReview";
import "./review.css"
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import MetaData from '../MetaData'
import { addToCart } from "../../../Actions/cartAction";
import { Dialog, DialogActions , DialogContent  , Button } from '@material-ui/core'
import {Rating} from '@material-ui/lab'
import { NEW_REVIEW_RESET } from "../../../Constants/productContant";

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const {success , error : reviewError} = useSelector(state => state.newReview)

  const [quantity, setQuantity] = useState(1)

  const increaseQt = () => {
    if(product.stock <= quantity) return;

    const qty = quantity + 1
    setQuantity(qty)
  }

  const decreaseQt = () => {
    if(1 >= quantity) return;
    const qty = quantity - 1
    setQuantity(qty)
  }

  const addToHandler = () => {
    dispatch(addToCart(params.id , quantity))
    toast.success("Items Added Successfully to Cart", {
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
    if(reviewError) {
        toast.error(reviewError, {
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
    if(success) {
      toast.success("Review Submitted Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        dispatch({type : NEW_REVIEW_RESET})
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, error , reviewError , success]);

  const options = {
    size: "large",
    color : "orange",
    value: product.ratings,
    readOnly: true,
    precision : 0.5
  };
 
  //Review Section
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(1)
  const [open, setOpen] = useState(false)

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true)
  }
  const match = useRouteMatch();

  const reviewSubmitHandler = () => {

    const myForm = new FormData();

    myForm.set("rating" , rating)
    myForm.set("comment" , comment)
    myForm.set("productId" , match.params.id)

    dispatch(newReviewAction(myForm))
    setOpen(false)
  }


  return (
   <>
        {loading ? (
          <Loader/>
        ): 
        <>
        <ToastContainer/>
        <MetaData title={`${product.name} - ${product.category} Books Wallah`}/>
        <div className="singleProductCont">
          <div className="carousel-container">
              <Carousel  autoPlay={true} showArrows={false}>
                  {product.images && product.images.map((item , i )=>(
                    // <div className="slidee">
                        <img style={{width : '60%' }} src={item.url}  key={i} alt={item.name} />
                    // </div>
                  ))}
              </Carousel>
          </div>
  
          {/* Information container  */}
          <div className="detail-container">
            <div className="top_container">
              <h1>{product.name}</h1>
            </div>
  
            <div className="mid_review">
              <Rating {...options} />
                 <span style={{paddingLeft : '5px', color : "black"}}>({product.numOfReviews}  Reviews)</span>
            </div>
  
            <div className="bottom_price">
              <h1>&#8377; {product.price}</h1> <strike style={{color : "red" , padding : '5px auto'}}>{`₹${product.price * 1.25}`}</strike>
  
                    <div className="nestedcont">
              <div className="quantity_container">
                <button style={{borderTopLeftRadius : '5px' , borderBottomLeftRadius : '5px'}} onClick={decreaseQt}>-</button>
                <input readOnly type="tel" value={quantity} />
                <button style={{borderTopRightRadius : '5px' , borderBottomRightRadius : '5px'}} onClick={increaseQt}>+</button>
              </div>
                 <button disabled={product.stock < 1 ? true : false} className="cartBtn" onClick={addToHandler}>Add to cart</button>
                </div>
            </div>
  
              
            
  
            <p id="instock">
              Status : 
              <b className={`  ${product.stock < 1 ? "redColor" : "greenColor"}`}>
                {product.stock < 1 ? " Out Of Stock" : " In Stock"}
              </b>
            </p>
            <div className="des-box">
                    Description :  <p>{product.description}</p>
            </div>
            <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
          </div>
        </div>

        {/* Dialog box for review  */}

        <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle} 
        >
          <h3 className="reviewHeading_dialog">Submit Review</h3>
          <DialogContent className="submitReviewDialog">
                      <Rating
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      size={'large'}
                      />
                    <textarea required className="sumitReviewComment" name="comment" id="" cols="30" rows="5" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color='secondary' >Cancel</Button>
            <Button onClick={reviewSubmitHandler} className="reviewAddBtn"  color='primary' >Submit</Button>
          </DialogActions>
        </Dialog>
  
  
        {/* Product Reviews Section  */}
         
         <h2 className="main-heading">
          Product Reviews 
         </h2>
  
        {product.reviews && product.reviews[0] ? (
          <div className="review-box">
            {product.reviews && product.reviews.map((reviews) => (
              <CardReview review={reviews}/>
            ))}
          </div>
        ) : (<p className="noRev">No Review Found of Product( {product.name})</p>)}
  
      </>}
   </>
  );
};

export default ProductDetail;
