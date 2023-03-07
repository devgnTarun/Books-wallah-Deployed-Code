import React, { useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../Layout/MetaData";
import { clearError, getProduct } from "../../Actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import book from '../Images/book.jpg'
import newb from '../Images/newb.jpg'
import sell from '../Images/sell.jpg'
import dogla from '../Images/doglapan.jpg'
import physic from '../Images/physic.jpg'
import chemist from '../Images/chemist.jpg'
import {  useHistory } from "react-router-dom";


const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );

  const redirectToPage = () => {
   history.push('/category/Special_Books')
  }
  const redirectToPageM = () => {
   history.push('/category/Competetive')
  }
  const redirectToPageA = () => {
   history.push('/category/2nd_Hand')
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
    dispatch(getProduct());
  }, [dispatch , error  ]);

  const AutoplaySlider = withAutoplay(AwesomeSlider);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer/>
          <MetaData title="Books Wallah" />
          <div className="main-container">

       

          <div className="imageContainer-slick">
                <AutoplaySlider
                bullets={true}
                play={true}
                animation="cubeAnimation"
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={3000}>
      <div data-src={book} />
      <div data-src={sell}  />
      <div data-src={newb}  />
    
    </AutoplaySlider>
    </div>

    {/* icons 720px walla  */}

    
    <div className="icons_quality">
            <div>
            <i className="far fa-check-circle"></i> <span>Reasonable Prices</span>
            </div>
            <div>
            <i className="fas fa-cart-arrow-down"></i><span>Easy Returns</span>
            </div>
            <div>
            <i className="fas fa-truck-moving"></i> <span>COD accepted</span>
            </div>
     </div>
      
    {/* featured books walla  */}
     <div className="side_feature">
         <h2>Featured Books</h2>
         <div className="item_side">
            <div className='imgDiv_featured'><img src={dogla} alt="" /></div>
            <div className='featured_content'><h3>Special Books</h3>
              <button onClick={redirectToPage}>See More</button>
              </div>
         </div>

         <div className="item_side">
            <div className='imgDiv_featured'><img src={physic} alt="" /></div>
            <div className='featured_content'><h3>Competetive Books</h3>
            <button onClick={redirectToPageM}>See More</button>
            </div>
         </div>

         <div className="item_side">
            <div className='imgDiv_featured'><img src={chemist} alt="" /></div>
            <div className='featured_content'><h3>Old Study Books </h3>
            <button onClick={redirectToPageA}>See More</button>
            </div>
         </div>

     </div>

          </div>


          {/* icons walla  */}
          <div className="icons_services">
            <div>
            <i className="far fa-check-circle"></i> <span>Reasonable Prices</span>
            </div>
            <div>
            <i className="fas fa-cart-arrow-down"></i><span>Easy Returns</span>
            </div>
            <div>
            <i className="fas fa-truck-moving"></i> <span>COD accepted</span>
            </div>
            </div>
            {/* boooks walla */}
            
          

          <h1 className="main-heading">Our Books</h1>

          <div id="product-co" className="product-container">
            {products &&
              products.map((key) => {
                return <ProductCard product={key} />;
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
