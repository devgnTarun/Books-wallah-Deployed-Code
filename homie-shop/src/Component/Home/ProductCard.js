import React from "react";
import { Link } from "react-router-dom";
import {Rating} from '@material-ui/lab'


const ProductCard = ( {product} ) => {

 
  const options = {
    size: "small",
    color : "orange",
    value: product.ratings,
    readOnly: true,
    precision : 0.5
  };
 
  return ( 
    <> 
      <Link className="productCard" to={`/product/${product._id}`}>
        <div className="image-box">
          <img
            src={product.images[0].url}
            alt={product.name}
          />      
        </div>
        <div className="content-box">
        <p>{product.name}</p>
        <div>
          <Rating {...options} /> <span style={{margin : " 10px"}} className="rev-span">({product.numOfReviews} Reviews)</span>
        </div>
        <div className='price_container_product'>
        <span>{`₹${product.price}`}</span> <strike style={{color : "red" , padding : '5px auto'}}>{`₹${product.price * 1.25}`}</strike>
        </div>
        <p className={`${1 > product.stock ? "redColor" : "greenColor"}` }>{1 > product.stock ? "Out of Stock" : "In Stock"}</p>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
