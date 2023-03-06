import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearError } from "../../../Actions/productAction";
import ProductCard from "../../Home/ProductCard";
import Loader from "../Loader/Loader";
import "./productDetail.css";
import { useRouteMatch } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider } from "@material-ui/core";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import MetaData from '../MetaData'
import NoProducts from "./NoProducts";

const categories =[
  'Special_Books',
  'E_Books',
  'NCERT_Books',
  'Competetive',
  '2nd_Hand',
  'School_College'
]  

const Products = () => {
  const dispatch = useDispatch();
  //Data from Backend through reducer and Action {Store}
  const { loading, error, products, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 40000000]);
  const [filterBtn, setfilterBtn] = useState('filter_container closed')
  const [category, setCategory] = useState('')
 
  const toggleBox = () => {
        if(filterBtn === 'filter_container closed') {
          setfilterBtn('filter_container')
        }
        else (
          setfilterBtn('filter_container closed')
        )
  }

  //For matching the params and Keyword apply
  const match = useRouteMatch();
  const keyword = match.params.keyword;

  //Setting page number through funtion
  const setCurrentpageNumber = (e) => {
    setCurrentPage(e);
  };

  //Price range selector
  const priceHandler = (e, newPrice) => {
      setPrice(newPrice);
    
  };

  // Get product Funtion

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
  
    dispatch(getProduct(keyword, currentPage , price , category));
  }, [dispatch, error, keyword, currentPage , price , category]);


  return (
    
    <>
     <div className={filterBtn}>
            <p>Price Range : </p>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={9999}
            />
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={999}
            />
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={499}
            />
            {/* <input type="range" name="range-slider" value={price} min={0} max={30000} onChange={priceHandler}/> */}
            <p>Category :</p>


            <ul className="categoryBox">
              {categories.map((category) => 
                 <li className="category-link" key={category} onClick={() => setCategory(category)}>{category}</li>
                )}
            </ul>


            <div onClick={toggleBox} className='filterbtn'>
              Filters 
            </div>
          </div>
      {loading ? (
        <Loader />
      ) : (
        <>
        <MetaData title={'All Books - Books Wallah'}/>
          <h2 className="main-heading product_h">All Books</h2>
        { products.length !== 0 ? <div className="products_page">
            {products && products.map((key) => <ProductCard product={key} />)}
          </div> : <NoProducts/>}

         

          {resultPerPage < productCount && (
            <div className="pagination_box">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                pageRangeDisplayed={1}
                onChange={setCurrentpageNumber}
                nextPageText={"Next"}
                prevPageText={"Previous"}
                firstPageText={"First"}
                lastPageText={"last"}
                linkClass={"page_link"}
                itemClass={"item_link"}
                activeClass={"paginationActive"}
                activeLinkClass={"pageLinkActive"}
              />
            </div>
          )}
        </>
      )}
    </>
    
  );
};

export default Products;
